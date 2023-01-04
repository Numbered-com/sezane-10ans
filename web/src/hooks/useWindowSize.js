import {
	useRef,
	useState,
} from 'react'
import useWindowResize from './useWindowResize'

const useWindowSize = (asRef = false) => {
	const windowSizeRef = useRef({width: 0, height: 0})

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})

	useWindowResize((e) => {
		windowSizeRef.current = {
			width: e.innerWidth,
			height: e.innerHeight,
		}
		if (!asRef) {
			setWindowSize(windowSizeRef.current)
		}
	}, true)

	return asRef ? windowSizeRef.current : windowSize
}

export default useWindowSize
