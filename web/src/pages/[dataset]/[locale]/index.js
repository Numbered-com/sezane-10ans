import {getHome, setLocale} from 'lib/api'

const Home = (props) => {
	return (
		<>
		</>
	)
}

export const getStaticPaths = async ({locales, preview}) => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps ({preview = false, locale, locales, defaultLocale}) {
	setLocale(locale || process.env.NEXT_PUBLIC_LOCALE, defaultLocale, locales)

	const [home] = await Promise.all([
		getHome(preview, process.env.NEXT_PUBLIC_SANITY_API_DATASET),
	])

	return {
		props: {
			...home,
			preview,
		},
		revalidate: 15,
	}
}

export default Home
