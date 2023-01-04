import useLocale from 'hooks/useLocale'

const Locale = ({children}) => {
	const locale = useLocale()

	return (
		<>
			{locale(children)}
		</>
	)
}

export default Locale
