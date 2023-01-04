import {useEffect} from 'react'
import useWindowResize from 'hooks/useWindowResize'
import {isSafari, iOSSafari} from 'utils/browser'
import styles from './layout.module.scss'
import Head from 'components/head/Head'
import Header from 'components/header/Header'

// const PageTransition = ({children}) => {
// 	const ref = useRef(null)
// 	const refScrollY = useRef(0)
// 	const isTouch = useRef(primaryInput === 'touch')
// 	const router = useRouter()
// 	const transitionCallback = useTransitionFix()
// 	const isScrollLocked = useScrollStore(state => state.isLocked)

// 	useEffect(() => {
// 		if (!ref.current) return

// 		if (isScrollLocked) {
// 			if (isTouch.current) {
// 				document.body.style.overflowY = 'hidden'
// 			} else {
// 				refScrollY.current = window.scrollY
// 				ref.current.style.position = 'fixed'
// 			}
// 		} else {
// 			if (isTouch.current) {
// 				document.body.style.overflowY = ''
// 			} else {
// 				ref.current.style.position = ''
// 				window.scrollTo(0, refScrollY.current)
// 			}
// 		}
// 	}, [isScrollLocked])

// 	const transition = useTransition({children, ref}, {
// 		keys: router.asPath,
// 		from: {
// 			opacity: 0,
// 		},
// 		enter: {
// 			opacity: 1,
// 		},
// 		leave: () => {
// 			return {
// 				position: 'fixed',
// 				visibility: 'hidden',
// 				immediate: true,
// 				onRest: (e) => {
// 					requestAnimationFrame(() => {
// 						transitionCallback()
// 					})
// 				},
// 			}
// 		},
// 		config: {duration: 1400, easing: quartOut},
// 	})

// 	return (
// 		<>
// 			{transition((style, {children}) =>
// 				<animated.div className={styles.transition} style={style} ref={ref}>
// 					{children}
// 				</animated.div>,
// 			)}
// 		</>
// 	)
// }

const Layout = ({appProps, pageProps, children}) => {
	useEffect(() => {
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

	return (
		<>
			<Header />
			<Head {...appProps.settings.settings} />

			{/* <Menu {...menu} /> */}
			{/* <PageTransition> */}
			<main className={styles.main}>{children}</main>
			{/* <Footer {...footer} /> */}
			{/* </PageTransition> */}
		</>
	)
}

export default Layout
