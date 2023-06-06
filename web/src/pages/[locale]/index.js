import RegisterForm from 'components/registerForm/RegisterForm'
import Outro from 'components/outro/Outro'
import useWindowResize from 'hooks/useWindowResize'
import {getHome, setLocale} from 'lib/api'
import {useRef, useState} from 'react'
import {cn} from 'utils/classnames'
import styles from '../index.module.scss'
import {CloudinaryImage} from 'components/image/Image'
import Key from 'svgs/key.svg'
import {animate, style, timeline} from 'motion'
import {ParallaxMedia} from 'components/parallaxMedia/ParallaxMedia'
import {expoInOut, quartInOut} from 'eases'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'
import useMediaQuery from 'hooks/useMediaQuery'
import useAppStore from 'stores/useAppStore'
import Locale from 'components/locale/Locale'
import LogoSezane from '../../svgs/logo-sezane.svg'
import Letter from '../../svgs/letter.svg'

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
					<footer className={styles.footer}>
						<h2><Locale>Suivez l'actualité du festival paradiso</Locale></h2>
						<span>#CinemaParadisoLouvre <a href='https://www.instagram.com/mk2hotelparadiso/' target='_blank' rel='noopener noreferrer'>@mk2hotelparadiso</a></span>
						<a href='https://www.sezane.com/fr' className={styles.logo}><LogoSezane /></a>
						<div className={styles.socials}>
							<a href='https://www.instagram.com/sezane/?hl=fr' target='_blank' rel='noopener noreferrer'>
								<svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M15.93 0.105484H6.57555C3.00028 0.112483 0.103676 3.003 0.0966797 6.57941V15.9438C0.103676 19.5133 2.99328 22.4178 6.57555 22.4248H15.93C19.5053 22.4178 22.4019 19.5133 22.4089 15.9438V6.57941C22.4019 3.01 19.5053 0.112483 15.93 0.105484ZM11.2563 17.2666C7.93989 17.2666 5.24619 14.5791 5.24619 11.2616C5.24619 7.94418 7.93989 5.24963 11.2563 5.24963C14.5727 5.25663 17.2594 7.94418 17.2664 11.2616C17.2664 14.5791 14.5727 17.2666 11.2563 17.2666ZM17.6862 6.11048C16.9725 6.11048 16.3988 5.53658 16.3988 4.8227C16.3988 4.10882 16.9725 3.53491 17.6862 3.53491C18.3998 3.53491 18.9736 4.10882 18.9736 4.8227C18.9736 5.53658 18.3998 6.11048 17.6862 6.11048ZM11.2563 6.97134H11.2353C8.87044 6.97834 6.96036 8.89602 6.96736 11.2616C6.96736 13.6272 8.88443 15.5519 11.2563 15.5519C13.6281 15.5519 15.5452 13.6272 15.5452 11.2616C15.5452 8.89602 13.6281 6.97134 11.2563 6.97134ZM11.2563 6.97134H11.2353C8.87044 6.97834 6.96036 8.89602 6.96736 11.2616C6.96736 13.6272 8.88443 15.5519 11.2563 15.5519C13.6281 15.5519 15.5452 13.6272 15.5452 11.2616C15.5452 8.89602 13.6281 6.97134 11.2563 6.97134ZM11.2563 6.97134H11.2353C8.87044 6.97834 6.96036 8.89602 6.96736 11.2616C6.96736 13.6272 8.88443 15.5519 11.2563 15.5519C13.6281 15.5519 15.5452 13.6272 15.5452 11.2616C15.5452 8.89602 13.6281 6.97134 11.2563 6.97134Z' fill='#040505' />
								</svg>
							</a>
							<a href='mailto:hello@sezane.com' target='_blank' rel='noopener noreferrer'>
								<Letter />
							</a>
							<a href='http://api.whatsapp.com/send/?phone=%2B33613742935&text&app_absent=0' target='_blank' rel='noopener noreferrer'>
								<svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M12.0727 1.46941C6.12553 1.43442 1.27688 6.23562 1.2419 12.1846C1.2349 14.0743 1.71766 15.929 2.64821 17.5667L1.29787 22.4869C1.24889 22.6409 1.29087 22.8089 1.40282 22.9208C1.48677 23.0188 1.59872 23.0748 1.72466 23.0818H1.82961L6.97213 21.836C8.53237 22.6899 10.2815 23.1378 12.0657 23.1378C18.0478 23.1378 22.8964 18.2876 22.8964 12.3036C22.8964 6.31961 18.0478 1.46941 12.0727 1.46941Z' fill='#040505' stroke='#040505' strokeWidth='2' strokeMiterlimit='10' />
									<path d='M17.5055 16.0655C17.0997 16.7514 16.407 17.2273 15.6164 17.3603C15.0427 17.4582 14.448 17.4162 13.8883 17.2553C13.3495 17.1083 12.8248 16.9123 12.328 16.6604C10.4039 15.7225 8.77372 14.2878 7.5843 12.5101C6.91962 11.7192 6.52781 10.7394 6.45084 9.70353C6.42985 8.84267 6.77969 8.01682 7.42338 7.43591C7.61928 7.22595 7.89215 7.10696 8.17901 7.11396H8.71775C8.87867 7.11396 9.09557 7.05797 9.36844 7.59688C9.58533 8.13579 10.18 9.48657 10.229 9.64755C10.313 9.80152 10.313 9.98348 10.229 10.1305C10.1241 10.2914 10.0681 10.3964 9.96315 10.5644C9.8512 10.7534 9.70427 10.9143 9.52936 11.0473C9.36843 11.2083 9.26348 11.3133 9.42441 11.5862C9.83721 12.3001 10.362 12.937 10.9847 13.4759C11.6353 14.0498 12.384 14.5047 13.1956 14.8267C13.3705 14.9737 13.6294 14.9527 13.7833 14.7777L13.7903 14.7707C14.1051 14.4347 14.392 14.0708 14.6509 13.6929C14.8118 13.4269 15.0287 13.4759 15.3016 13.5319C15.5674 13.6369 16.9178 14.2878 17.1907 14.3928C17.3936 14.4487 17.5825 14.5607 17.7294 14.7147C17.7224 15.1766 17.6524 15.6315 17.5055 16.0655Z' fill='#040505' stroke='white' strokeWidth='1.5' strokeMiterlimit='10' />
								</svg>
							</a>
						</div>
						<a className={styles.cgv} href='https://www.sezane.com/fr/apropos/conditions-generales-de-vente' target='_blank' rel='noopener noreferrer'>
							CGV
						</a>

						{process.env.NODE_ENV === 'production' && (
							{/* <iframe
								ref={iframeRef}
								frameBorder='0' scrolling='no'
								width='100%'
								onLoad={resizeIframe}
								src={`https://${process.env.NEXT_PUBLIC_SANITY_API_DATASET === 'octobre' ? 'www.octobre-editions.com' : 'www.sezane.com'}/${footerLocale[process.env.NEXT_PUBLIC_LOCALE]}/footer`} /> */}
						)}
					</footer>
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

export const getStaticPaths = async ({locales, preview}) => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps ({preview = false, params, locale, locales, defaultLocale}) {
	setLocale(params.locale || process.env.NEXT_PUBLIC_LOCALE, defaultLocale, locales)

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
