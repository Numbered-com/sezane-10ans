import {useSpring, animated} from '@react-spring/web'
import RegisterForm from 'components/registerForm/RegisterForm'
import Outro from 'components/outro/Outro'
import {quartInOut} from 'eases'
import useWindowResize from 'hooks/useWindowResize'
import useScrollRatio from 'hooks/useScrollRatio'
import {getHome, setLocale} from 'lib/api'
import {useEffect, useRef} from 'react'
import {cn} from 'utils/classnames'
import styles from './index.module.scss'
import {CloudinaryImage} from 'components/image/Image'
import Key from 'svgs/key.svg'
import {timeline} from 'motion'
import {ParallaxMedia} from 'components/parallaxMedia/ParallaxMedia'

const Home = (props) => {
	const {
		title,
		subtitleIntro,
		heroImage,
		formSurtitle,
		formTitle,
		formDescription,
		formOptin1,
		formOptin2,
		formImage,
		thanksTitle,
		thanksImage,
		thanksDescription,
		thanksOptin,
		thanksCtaLabel,
	} = props
	const mainRef = useRef(null)
	const iframeRef = useRef(null)
	const keyRef = useRef(null)
	const tl = useRef(null)
	const [style, api] = useSpring(() => ({
		from: {
			// mainPosition: 'fixed',
			// mainY: 'translate3d(0,100vh,0)',

			outroY: 'translate3d(0,100%,0)',
			outroVisibility: 'hidden',
		},
		config: (value) => ({
			duration: 1200,
			easing: quartInOut,
			restVelocity: 0.001,
		}),
	}))

	const handleCancel = () => {
		api.start({
			outroY: 'translate3d(0,100%,0)',
		})
	}

	const handleSubmit = () => {
		api.start({
			outroVisibility: 'inherit',
			outroY: 'translate3d(0,0%,0)',
		})
	}

	useWindowResize(() => {
		if (iframeRef?.current) iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.scrollHeight + 'px'
	})

	useEffect(() => {
		tl.current = timeline([
			[keyRef.current, {scale: [1, 70], translateZ: 0}, {duration: 1}],
			[keyRef.current, {opacity: [1, 0]}, {duration: 0.1, at: 0.9}],
		], {duration: 1, easing: 'linear'})
		tl.current.pause()
	}, [])

	useScrollRatio(mainRef, (ratio) => {
		tl.current.currentTime = ratio
	}, {offset: [[0, 0], [0.75, 1]]})

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
				<aside aria-hidden className={styles.overlay} ref={keyRef}>
					<i />
					<Key />
					<i />
				</aside>
				<main className={styles.main} ref={mainRef}>
					<header className={styles.header}>
						<figure>
							<ParallaxMedia
								distance={300} offset={[
									[0, 0],
									[1, 0],
								]}>
								<CloudinaryImage src={heroImage} width={1440} height={1473} className={styles.background} />
							</ParallaxMedia>
							<figcaption className={styles.caption}>
								<h1 className='hm-1 hd-1'>{title}</h1>
								{subtitleIntro && <p className={cn('pm-m pd-l upper', styles.description)}>{subtitleIntro}</p>}
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
				onCancel={handleCancel}
				optin={thanksOptin}
				ctaLabel={thanksCtaLabel}
				style={{transform: style.outroY, visibility: style.outroVisibility}} />
			{/* <Thanks message={thanksMessage} thanksCtaLabel={thanksCtaLabel} image={thanksImage} style={{transform: style.thanksY, visibility: style.thanksVisibility}} ctaUrl={thanksCtaUrl} /> */}
		</>
	)
}

export async function getStaticProps ({preview = false, locale, locales, defaultLocale}) {
	setLocale(locale || process.env.NEXT_PUBLIC_LOCALE)

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
