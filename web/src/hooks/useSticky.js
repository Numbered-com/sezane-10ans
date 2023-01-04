import {useRef} from 'react'
import {primaryInput} from 'detect-it'
import useMediaQuery from './useMediaQuery'
import useRaf from './useRaf'
import {clamp} from 'utils/maths'
import useResizeObserver from './useResizeObserver'

const useSticky = (easing = null) => {
	const ref = useRef(null)
	const height = useRef(0)
	const top = useRef(0)

	const parentRef = useRef(null)

	const isTouch = useRef(primaryInput === 'touch')

	const {isDesktop} = useMediaQuery()

	useResizeObserver(ref, (e) => {
		height.current = e.height
		top.current = e.top
	}, [isDesktop])

	useRaf(() => {
		if (parentRef?.current) {
			if (!isDesktop || isTouch.current) return

			const v = (parentRef.current.__height - height.current) - top.current

			let p = clamp(parentRef.current.__y / v, 0, 1)
			if (easing) p = easing(p)
			const y = p * v
			ref.current.style.transform = `translate3d(0,${y}px,0)`
		}
	})

	return [ref, parentRef]
}

export default useSticky
