import {useEffect} from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = (ref, callback, effectProps = []) => {
	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			callback(entries[0].contentRect)
		})

		resizeObserver.observe(ref.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [ref, ...effectProps])
}

export default useResizeObserver
