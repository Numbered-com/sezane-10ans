import {useEffect} from 'react'

const useFontLoaded = (callback) => {
	useEffect(() => {
		document.fonts.ready.then(callback)
	}, [])
}

export default useFontLoaded
