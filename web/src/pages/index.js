import RegisterForm from 'components/registerForm/RegisterForm'
import Outro from 'components/outro/Outro'
import useWindowResize from 'hooks/useWindowResize'
import {getHome, setLocale} from 'lib/api'
import {useRef, useState} from 'react'
import {cn} from 'utils/classnames'
import styles from './index.module.scss'
import {CloudinaryImage} from 'components/image/Image'
import Key from 'svgs/key.svg'
import {animate, style, timeline} from 'motion'
import {ParallaxMedia} from 'components/parallaxMedia/ParallaxMedia'
import {expoInOut, quartInOut} from 'eases'
import useAppStore from 'stores/useAppStore'
import useMediaQuery from 'hooks/useMediaQuery'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'

const Home = (props) => {
	const {
		title,
		subtitleIntro,
		heroImage,
		thanksTitle,
		thanksImage,
		thanksDescription,
		thanksOptin,
		thanksCtaLabel,
	} = props

	const mainRef = useRef(null)
	const iframeRef = useRef(null)
	const titleRef = useRef(null)
	const keyRef = useRef(null)
	const backgroundRef = useRef(null)
	const tl = useRef(null)
	const [outroIsOpened, setOutroIsOpened] = useState(false)
	const lenis = useAppStore((state) => state.lenis)
	const isDesktop = useMediaQuery()

	const handleSubmit = () => {
		setOutroIsOpened(true)
	}

	useWindowResize(() => {
		if (iframeRef?.current) iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.scrollHeight + 'px'
	})

	useIsomorphicLayoutEffect(() => {
		if (history.scrollRestoration) {
			history.scrollRestoration = 'manual'
		}

		if (lenis && isDesktop) {
			lenis.scrollTo(0)
			const titleRect = titleRef.current.getBoundingClientRect()
			const dest = titleRef.current.offsetTop + titleRect.height - window.innerHeight// lenis.scroll
			tl.current = timeline([
				[keyRef.current, {scale: [1, 37]}, {duration: 3}],
				// [backgroundRef.current, {scale: [1.2, 1]}, {duration: 3, easing: quartInOut, at: 0}],
				// [(progress) => { console.log('index.js', progress) }, {duration: 3, easing: quartInOut, at: 0}],
			], {duration: 2, defaultOptions: {easing: expoInOut, delay: 0.2}})

			animate(
				(progress) => {
					lenis.scrollTo(progress * dest, {immediate: true})
					// window.scrollTo(0, progress * dest)
				},
				{duration: 2.3, easing: quartInOut, delay: 0.2},
			)
		}
	}, [isDesktop, lenis])

	// useScrollRatio(mainRef, (ratio) => {
	// 	tl.current.currentTime = ratio
	// }, {offset: [[0, 0], [0.75, 1]]})

	const resizeIframe = (obj) => {
		obj.target.style.height = obj.target.contentWindow.document.documentElement.scrollHeight + 'px'
	}

	const footerLocale = {
		fr_fr: 'fr',
		en_us: 'us',
		en_ca: 'us',
		en_au: 'au',
		en_uk: 'en',
		en_da: 'eu',
		en_eu: 'eu',
	}

	return (
		<>
			<div className={styles.main} style={{transform: style.mainY, position: style.mainPosition}}>
				<aside aria-hidden className={styles.overlay}>
					<div ref={keyRef}>
						<i />
						<Key />
						<i />
					</div>
				</aside>
				<main className={styles.main} ref={mainRef}>
					<header className={styles.header}>
						<figure>
							<ParallaxMedia
								scrollProps={{className: styles.mediaWrapper}}
								distance={200}
								offset={[
									[0, 0],
									[1, 0],
								]}>
								<CloudinaryImage src={heroImage} width={1280} height={1834} className={styles.background} priority ref={backgroundRef} />
							</ParallaxMedia>
							<figcaption className={styles.caption} ref={titleRef}>
								<div className='container'>
									<h1 className='hm-1 hd-1'>{title}</h1>
									{subtitleIntro && <p className={cn('pm-l pd-l upper', styles.description)}>{subtitleIntro}</p>}
								</div>
							</figcaption>
						</figure>
					</header>
					<RegisterForm {...props} onSubmit={handleSubmit} />
					{process.env.NODE_ENV === 'production' && (
						<footer className={styles.footer}>
							<iframe
								ref={iframeRef}
								frameBorder='0' scrolling='no'
								width='100%'
								onLoad={resizeIframe}
								src={`https://${process.env.NEXT_PUBLIC_SANITY_API_DATASET === 'octobre' ? 'www.octobre-editions.com' : 'www.sezane.com'}/${footerLocale[process.env.NEXT_PUBLIC_LOCALE]}/footer`} />
						</footer>
					)}
				</main>
			</div>
			<Outro
				title={thanksTitle}
				description={thanksDescription}
				image={thanksImage}
				// onCancel={handleCancel}
				optin={thanksOptin}
				ctaLabel={thanksCtaLabel}
				isOpened={outroIsOpened} />
			{/* <Thanks message={thanksMessage} thanksCtaLabel={thanksCtaLabel} image={thanksImage} style={{transform: style.thanksY, visibility: style.thanksVisibility}} ctaUrl={thanksCtaUrl} /> */}
		</>
	)
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
