import {useSpring, animated} from '@react-spring/web'
import Intro from 'components/intro/Intro'
import MiniCart from 'components/miniCart/MiniCart'
import Outro from 'components/outro/Outro'
import ProductCard, {ProductCardVariant} from 'components/productCard/ProductCard'
import Thanks from 'components/thanks/Thanks'
import {expoInOut, expoOut} from 'eases'
import useWindowResize from 'hooks/useWindowResize'
import {getHome, getProducts, setLocale} from 'lib/api'
import {useRef} from 'react'
import {cn} from 'utils/classnames'
import styles from './index.module.scss'

const Home = (props) => {
	const {title, introOptin, subtitleIntro, subtitleOutro, description, products, outroImage, thanksMessage, thanksImage, thanksCtaUrl, thanksCtaLabel, outroSubtitle, outroHelp} = props
	const iframeRef = useRef(null)
	const [style, api] = useSpring(() => ({
		from: {
			mainPosition: 'fixed',
			mainY: 'translate3d(0,100vh,0)',
			cartY: 'translate3d(0,150%,0)',
			outroY: 'translate3d(0,100%,0)',
			outroVisibility: 'hidden',
			thanksY: 'translate3d(0,100%,0)',
			thanksVisibility: 'hidden',
		},
		config: (value) => ({
			duration: value === 'cartY' ? 1800 : 2000,
			easing: value === 'cartY' ? expoOut : expoInOut,
			restVelocity: 0.001,
		}),
	}))

	const handleHide = () => {
		api.start({
			mainPosition: '',
			mainY: 'translate3d(0,0vh,0)',
			cartY: 'translate3d(0,0%,0)',
			delay: (value) => {
				if (value === 'cartY') { return 800 } else { return 0 }
			},
		})
	}

	const handleMiniCartSubmit = () => {
		api.start({
			outroVisibility: 'inherit',
			outroY: 'translate3d(0,0%,0)',
		})
	}

	const handleCancel = () => {
		api.start({
			outroY: 'translate3d(0,100%,0)',
		})
	}

	const handleSubmit = () => {
		api.start({
			thanksVisibility: 'inherit',
			thanksY: 'translate3d(0,0%,0)',
		})
	}

	useWindowResize(() => {
		if (iframeRef?.current) iframeRef.current.style.height = iframeRef.current.contentWindow.document.documentElement.scrollHeight + 'px'
	})

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
			<Intro {...props} subtitle={subtitleIntro} onHide={handleHide} />
			<animated.div className={styles.main} style={{transform: style.mainY, position: style.mainPosition}}>
				<main className={cn('container', styles.main)}>
					<header className={styles.header}>
						<h1 className='hm-1 hd-1'>{title}</h1>
						<p className={cn('pm-m pd-m', styles.description)}>{description}</p>
					</header>
					<section className={styles.products}>
						<ul>
							{products.map((product, i) => (
								<ProductCard key={`${product._id}${i}`} {...product} variant={ProductCardVariant.large} />
							))}
						</ul>
					</section>
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
			</animated.div>
			<Outro optin={introOptin} subtitle={subtitleOutro} image={outroImage} onSubmit={handleSubmit} onCancel={handleCancel} outroHelp={outroHelp} outroSubtitle={outroSubtitle} style={{transform: style.outroY, visibility: style.outroVisibility}} />
			<Thanks message={thanksMessage} thanksCtaLabel={thanksCtaLabel} image={thanksImage} style={{transform: style.thanksY, visibility: style.thanksVisibility}} ctaUrl={thanksCtaUrl} />
			<MiniCart style={{transform: style.cartY}} onSubmit={handleMiniCartSubmit} />
		</>
	)
}

export async function getStaticProps ({preview = false, locale, locales, defaultLocale}) {
	setLocale(locale || process.env.NEXT_PUBLIC_LOCALE)

	const [home, products] = await Promise.all([
		getHome(preview, process.env.NEXT_PUBLIC_SANITY_API_DATASET),
		getProducts(preview, process.env.NEXT_PUBLIC_SANITY_API_DATASET),
	])

	return {
		props: {...home, products, preview},
		revalidate: 15,
	}
}
export default Home
