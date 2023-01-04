import {useContext} from 'react'
import LocaleContext from 'contexts/LocaleContext'

const useLocale = () => {
	const strings = useContext(LocaleContext)

	return (value) => (strings && strings[value]) || value
}

export default useLocale
