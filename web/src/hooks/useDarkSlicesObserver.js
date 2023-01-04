import {useState, useEffect, useRef} from 'react'
import useDarkSlices from './useDarkSlices'
import useResizeObserver from './useResizeObserver'

const useDarkSlicesObserver = ref => {
	const [isDark, setIsDark] = useState(true)
	const intersectionObserver = useRef()

	const darkSlices = useDarkSlices()

	useEffect(() => {
		if (intersectionObserver.current) {
			intersectionObserver.current.disconnect()
			darkSlices.forEach((slice) => {
				intersectionObserver.current.observe(slice)
			})
		}

		return () => {
			if (intersectionObserver.current) {
				intersectionObserver.current.disconnect()
			}
		}
	}, [darkSlices])

	useResizeObserver(ref, entry => {
		if (intersectionObserver.current) intersectionObserver.current.disconnect()

		if (!ref.current) return

		const height = entry.height
		const top = ref.current.offsetTop

		const rootMargin = `${Math.round(-top - height / 2)}px -50% ${Math.round(top + height / 2 - window.innerHeight + 1)}px -50%`
		intersectionObserver.current = new window.IntersectionObserver(handleIntersect, {
			root: null,
			rootMargin,
			threshold: 0,
		})
		darkSlices.forEach(slice => {
			intersectionObserver.current.observe(slice)
		})
	}, [darkSlices])

	const handleIntersect = (entries, observer) => {
		for (let i = 0, l = entries.length; i < l; i++) {
			const entry = entries[i]

			if (entry.isIntersecting) {
				setIsDark(!entry.isIntersecting)
				break
			} else {
				setIsDark(!entry.isIntersecting)
			}
		}
	}

	return isDark
}

export default useDarkSlicesObserver
