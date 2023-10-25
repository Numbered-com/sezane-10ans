import {useRef, useCallback} from 'react'

import useRaf from './useRaf'
import useResizeObserver from './useResizeObserver'
import useWindowResize from './useWindowResize'
import offsetTop from 'utils/offsetTop'
import {useScroll} from './useScroll'

const defaultOptions = {
	offset: [
		[0.5, 0.5],
		[1, 0],
	],
	easingFunction: value => value,
	ease: 1,
}

const useScrollRatio = (
	ref,
	callback,
	options = defaultOptions,
	deps = [],
) => {
	options = {...defaultOptions, ...options}

	const scrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0)
	const enabled = useRef(false)

	const viewport = useRef({width: 0, height: 0})
	const ratio = useRef(0)
	const top = useRef(0)
	const width = useRef(0)
	const height = useRef(0)
	const immediate = useRef(false)

	const fromOffset = options.offset[0]
	const fromOffsetElement = fromOffset[0]
	const fromOffsetViewport = fromOffset[1]
	const toOffset = options.offset[1]
	const toOffsetElement = toOffset[0]
	const toOffsetViewport = toOffset[1]

	//   const device = useRef(null);

	//   useMatchDevice(detectedDevice => {
	//     device.current = detectedDevice;
	//   });

	const tick = useCallback(() => {
		if (enabled.current && ref.current && viewport.current.height && height.current) {
			const easing = immediate.current ? 1 : options.ease
			const fromY = fromOffsetElement * height.current - fromOffsetViewport * viewport.current.height
			const toY = toOffsetElement * height.current - toOffsetViewport * viewport.current.height
			const dY = toY - fromY

			ratio.current += ((scrollY.current - (fromY + top.current)) / dY - ratio.current) * easing
			// console.log('useScrollRatio.js--', scrollY.current, fromY, top.current, dY, easing, options.ease)

			immediate.current = false

			callback(options?.easingFunction ? options.easingFunction(ratio.current) : ratio.current, {
				easing,
				originalRatio: ratio.current,
				scrollY: scrollY.current,
				top: top.current,
				height: height.current,
				viewport: viewport.current,
			})
		}
	}, deps)
	useRaf(tick)

	const handleResize = (e) => {
		if (e) {
			viewport.current.width = e.innerWidth
			viewport.current.height = e.documentHeight
		}

		immediate.current = true
	}

	useWindowResize(handleResize, true)

	useResizeObserver(ref, e => {
		const w = e.width || (ref.current).offsetWidth
		enabled.current = true// device.current && options.mediaQueries!.indexOf(device.current) !== -1;
		if (enabled.current) {
			requestAnimationFrame(() => {
				top.current = offsetTop(ref.current)
			})
		}
		width.current = w
		height.current = e.height || (ref.current).offsetHeight
		immediate.current = true
	})

	useScroll(e => {
		scrollY.current = e.scroll || scrollY.current || 0
	})
}

export default useScrollRatio
