import useWindowResize from 'hooks/useWindowResize'
import {isSafari, iOSSafari} from 'utils/browser'
import styles from './layout.module.scss'
import Head from 'components/head/Head'
import Header from 'components/header/Header'
import useRaf from 'hooks/useRaf'
import Lenis from '@studio-freight/lenis'
import useAppStore from 'stores/useAppStore'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'

const Layout = ({appProps, pageProps, children}) => {
	const [lenis, setLenis] = useAppStore((state) => [state.lenis, state.setLenis])

	useIsomorphicLayoutEffect(() => {
		const sbw = window.innerWidth - document.body.offsetWidth
		document.documentElement.style.setProperty('--sbw', `${sbw}px`)
	}, [])

	useWindowResize((e) => {
		// fix safari rendering issue
		if (isSafari || iOSSafari) {
			document.documentElement.style.display = 'inline-block'
			// eslint-disable-next-line no-unused-expressions
			document.documentElement.offsetHeight
			document.documentElement.style.display = ''
		}
	}, true)

	useIsomorphicLayoutEffect(() => {
		const lenis = new Lenis({
			duration: 0.8,
			mouseMultiplier: 0.5,
			direction: 'vertical',
			gestureDirection: 'vertical',
			smooth: true,
			smoothTouch: false,
			touchMultiplier: 2,
		})

		setLenis(lenis)

		return () => {
			lenis?.destroy()
		}
	}, [])

	useRaf(time => lenis?.raf(time), true)

	return (
		<>
			<Header />
			<Head {...appProps.settings.settings} />

			<main className={styles.main}>{children}</main>
			{/* <Footer {...footer} /> */}
		</>
	)
}

export default Layout
