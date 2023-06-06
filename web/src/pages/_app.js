import App from 'next/app'
import Layout from 'layouts/Layout'

import 'styles/general/reset.scss'
import 'styles/general/grid.scss'
import 'styles/general/fonts.scss'
import 'styles/general/base.scss'
import 'styles/general/media.scss'
import 'styles/general/text.scss'
import 'styles/general/links.scss'

import {getLocalisation, getSettings, setLocale} from 'lib/api'
import LocaleContextProvider from 'contexts/LocaleContextProvider'

function MyApp ({Component, pageProps, appProps, router}) {
	return (
		<LocaleContextProvider strings={appProps.locales}>
			<Layout appProps={appProps} pageProps={pageProps}>
				<Component {...pageProps} path={router.asPath} />
			</Layout>
		</LocaleContextProvider>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
MyApp.getInitialProps = async (appContext) => {
	if (typeof window !== 'undefined') return
	const {router, ctx} = appContext
	const lc = ctx.query?.locale?.replace('-', '_') || process.env.NEXT_PUBLIC_LOCALE
	setLocale(lc)
	// setLocale(router.locale, router.defaultLocale, router.locales)

	const initialProps = await App.getInitialProps(appContext)
	const appProps = {}
	appProps.statusCode = ctx.res.statusCode
	try {
		const [settings, locales] = await Promise.all([getSettings(router.isPreview), getLocalisation()])
		appProps.locale = lc
		appProps.locales = locales
		appProps.settings = {}
		settings?.forEach(element => { appProps.settings[element._type] = element })
	} catch (error) {
		console.error(error)
	}
	return {...initialProps, appProps}
}

export default MyApp
