import LocaleContext from './LocaleContext'
import {useRef} from 'react'

const LocaleContextProvider = ({children, strings}) => {
	const state = useRef(strings)

	return (
		<LocaleContext.Provider value={state.current}>
			{children}
		</LocaleContext.Provider>
	)
}

export default LocaleContextProvider
