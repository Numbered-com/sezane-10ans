import {useState} from 'react'
import {isDesktopWidth} from 'utils/mediaQueries'
import useWindowResize from './useWindowResize'

const useMediaQuery = () => {
	const [isDesktop, setIsDesktop] = useState(false)

	useWindowResize(() => {
		setIsDesktop(isDesktopWidth())
	}, true)

	return isDesktop
}

export default useMediaQuery
