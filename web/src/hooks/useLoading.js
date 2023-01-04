import {useEffect, useState} from 'react'

const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (isLoading) {
			document.body.classList.add('is-loading')
		} else {
			document.body.classList.remove('is-loading')
		}
	}, [isLoading])

	return setIsLoading
}

export default useLoading
