import {useRef, useEffect, forwardRef} from 'react'
import shallow from 'zustand/shallow'
import {primaryInput} from 'detect-it'
import useRaf from 'hooks/useRaf'
import useWindowScroll from 'hooks/useWindowScroll'
import styles from './SmoothScroll.module.scss'
import useScrollStore from 'stores/useScrollStore'
import useAppStore from 'stores/useAppStore'
import {cn} from 'utils/classnames'
import useResizeObserver from 'hooks/useResizeObserver'

const SmoothScroll = ({
	children = null,
	as = 'div',
	className = null,
	childClassName = null,
	childStyle = null,
	onScroll = () => {},
	autoDisablePointerEvents = true,
	sticky = null,
}, ref) => {
	const Tag = as
	const mainRef = useRef(null)
	const dummyRef = useRef(null)
	const observer = useRef(null)
	const useStore = useScrollStore()
	const [enabled, isLocked] = useScrollStore(state => [state.enabled, state.isLocked], shallow)
	const isEnabled = useRef(enabled)
	const isDirty = useRef(true)
	const height = useRef(0)
	const top = useRef(0)
	const isFirstScroll = useRef(true)
	const windowSize = useRef(useAppStore.getState().windowSize)

	// physics
	const _y = useRef(0)
	const y = useRef(0)
	const vy = useRef(0)

	// const isFirefox = useRef(typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > -1 : false)
	const easing = 0.2

	const pointerDisabled = useRef(false)

	const intersectionHandler = (entries) => {
		const dummyEntry = entries.filter(e => (e.target === dummyRef.current))[0]
		if (dummyEntry) {
			observer.current.unobserve(dummyEntry.target)

			// TODO: store window.scrollY statically once to avoid reflow
			top.current = dummyEntry.boundingClientRect.top + window.scrollY
			tick(true)
		}
	}

	const tick = (now) => {
		if (mainRef.current && windowSize.current) {
			if (primaryInput !== 'touch') {
				if (isEnabled.current) {
					if (now || isFirstScroll.current) {
						y.current = _y.current
						vy.current = 0
					} else {
						vy.current = _y.current - y.current
						y.current += vy.current * easing
					}
				}

				const inView = y.current - top.current - height.current <= 0 && y.current - top.current + windowSize.current.height >= 0
				let yRound = ((y.current - top.current + 0.01) * 1000 | 0) / 1000 // rounding values
				if (sticky) yRound = Math.min(yRound, 0)

				if (inView) {
					if (!isDirty.current) {
						mainRef.current.style.visibility = ''
						mainRef.current.style.willChange = 'transform'
						isDirty.current = true
					}

					const translate = `translate3d(0,${-yRound}px,0)`
					mainRef.current.style.transform = translate
					if (ref?.current) ref.current.__y = yRound
					onScroll(yRound)

					// disable pointer events while scrolling
					if (autoDisablePointerEvents) {
						const vyAbs = Math.abs(vy.current)
						if (!pointerDisabled.current && vyAbs > 10) {
							pointerDisabled.current = true
							mainRef.current.style.pointerEvents = 'none'
						} else if (pointerDisabled && vyAbs <= 10) {
							pointerDisabled.current = false
							mainRef.current.style.pointerEvents = ''
						}
					}
				} else if (isDirty.current) {
					mainRef.current.style.visibility = 'hidden'
					mainRef.current.style.willChange = ''
					mainRef.current.style.transform = ''
					isDirty.current = false
				}
			}
		}
	}

	const resizeHandler = () => {
		if (dummyRef.current) {
			observer.current.observe(dummyRef.current)
		}
	}

	useEffect(() => {
		return useAppStore.subscribe(state => { windowSize.current = state.windowSize })
	}, [])

	useEffect(() => {
		isEnabled.current = enabled

		if (primaryInput !== 'touch') {
			mainRef.current.classList.add(styles.isActive)

			const state = useStore.getState()
			observer.current = state.observer
			state.addObserverCallback(intersectionHandler)
			state.addResizeCallback(resizeHandler)

			return () => {
				state.removeObserverCallback(intersectionHandler)
				state.removeResizeCallback(resizeHandler)
			}
		}
	}, [enabled])

	useResizeObserver(mainRef, (entry) => {
		if (dummyRef.current) {
			const h = entry.bottom + entry.top
			if (h !== height.current) {
				height.current = h
				if (ref?.current) ref.current.__height = h

				dummyRef.current.style.height = `${height.current}px`
			}
		}
	})

	if (primaryInput !== 'touch') {
		useRaf(() => tick(), true)
	}

	useWindowScroll((e) => {
		if (isEnabled.current && !isLocked) {
			_y.current = e.pageYOffset
		}

		if (isFirstScroll.current) {
			y.current = _y.current
			isFirstScroll.current = false
		}
	}, false, [isLocked])

	return (
		<Tag className={className} ref={ref}>
			<div ref={mainRef} className={cn(styles.container, childClassName)} style={childStyle}>
				{children}
			</div>
			<div
				ref={dummyRef}
				className={styles.size}
				aria-hidden />
		</Tag>
	)
}

export default forwardRef(SmoothScroll)
