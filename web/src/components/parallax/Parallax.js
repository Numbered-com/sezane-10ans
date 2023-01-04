import {useRef, useEffect, forwardRef, useState} from 'react'
import offsetTop from 'utils/offsetTop'
import useWindowResize from 'hooks/useWindowResize'
import useRaf from 'hooks/useRaf'
import useAppStore from 'stores/useAppStore'
import {getCurrentDevice, MOBILE, TABLET, DESKTOP} from 'utils/mediaQueries'
import {quadIn, quadInOut} from 'eases'
import {clamp} from 'utils/maths'

const ORIGIN_TOP = 'top'
const ORIGIN_CENTER = 'center'
const ORIGIN_BOTTOM = 'bottom'

const Parallax = ({
	children,
	className = null,
	z = 0,
	distance = 0,
	rotateInit = 0,
	ease = 1,
	rotate = 0,
	overflow = null,
	origin = ORIGIN_CENTER,
	mediaQueries = [MOBILE, TABLET, DESKTOP],
	as = 'div',
}, ref) => {
	const el = useRef(null)
	const target = useRef(null)
	const Tag = as
	const scrollY = useRef(0)
	const resizeValues = useRef(null)
	const areFontsLoaded = useRef(false)
	const [enabled, setEnabled] = useState(false)

	const setRef = element => {
		el.current = element
		if (ref) ref.current = element
	}

	const viewportWidth = useRef(0)
	const viewportHeight = useRef(0)
	const a = useRef(rotateInit)
	const y = useRef(0)
	const oy = useRef(null)
	const scale = useRef(1)
	const top = useRef(0)
	const height = useRef(0)
	const maxDist = useRef(0)
	const needsUpdate = useRef(false)

	const handleResize = (e) => {
		if (e) resizeValues.current = e

		// TODO optimization: handleResize should only be triggered when:
		// - full document resize to get proper offsetTop
		// - e.documentHeight !== viewportHeight.current
		// if (e.documentHeight !== viewportHeight.current) {
		viewportWidth.current = resizeValues.current.innerWidth
		viewportHeight.current = resizeValues.current.documentHeight

		const device = getCurrentDevice()
		const _enabled = Boolean(mediaQueries.indexOf(device) !== -1 && (z || distance))
		setEnabled(_enabled)

		// parallax
		if (target.current) {
			target.current.style.transform = ''

			if (_enabled) {
				top.current = offsetTop(target.current)
				height.current = target.current.offsetHeight
				const d = device === DESKTOP ? 120 : 60
				maxDist.current = -(z * d + distance)
				if (overflow === 'hidden') scale.current = (height.current + Math.abs(maxDist.current)) / height.current
				needsUpdate.current = true
			}
		}
	}

	useEffect(() => {
		document.fonts.ready.then(() => {
			areFontsLoaded.current = true
			handleResize()
		})

		useAppStore.subscribe(
			(state) => {
				scrollY.current = state.scrollY
			},
		)
	}, [])

	useWindowResize(handleResize, true)

	useRaf(() => {
		if (enabled) {
			const dy = origin === ORIGIN_CENTER ? (height.current - viewportHeight.current) / 2
				: (origin === ORIGIN_BOTTOM ? height.current - viewportHeight.current : 0)
			const p = (top.current + dy - scrollY.current) / viewportHeight.current
			// if (p > 0) p = 0
			// p = -quadIn(-p)
			const initY = top.current - scrollY.current

			// const destY = -clamp(0, 1, 0.5 - p) * maxDist.current
			const destY = p * maxDist.current

			y.current += (destY - y.current) * ease

			if (rotate) {
				const destRotation = -rotate * initY / viewportHeight.current + rotateInit
				a.current += (destRotation - a.current) * ease
			}

			const roundedY = (y.current * 100 | 0) / 100
			const newY = initY + roundedY
			const isIn =
			(newY + height.current > 0 && newY < viewportHeight.current) ||
			(initY + height.current > 0 && initY < viewportHeight.current)

			if (target.current && isIn && (roundedY !== oy.current || needsUpdate.current)) {
				const scaleTransformation = scale.current !== 1 ? ` scale(${scale.current})` : ''
				const rotateTransformation = a.current ? ` rotate(${a.current}deg)` : ''
				target.current.style.transform = `translate3d(0,${roundedY}px,0)${rotateTransformation}${scaleTransformation}`
				needsUpdate.current = false
			}

			oy.current = roundedY
		}
	})

	return (
		<Tag ref={setRef} className={className} style={enabled ? {overflow} : null}>
			<div ref={target}>
				{children}
			</div>
		</Tag>
	)
}

export default forwardRef(Parallax)
