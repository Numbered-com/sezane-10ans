import {animated, useSpring} from '@react-spring/web'
import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import Checkbox from 'components/checkbox/Checkbox'
import CustomBlockContent from 'components/customBlockContent/customBlockContent'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import Locale from 'components/locale/Locale'
import {quartOut} from 'eases'
import expoInOut from 'eases/expo-in-out'
import useLocale from 'hooks/useLocale'
import {useCallback, useRef} from 'react'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './intro.module.scss'

const Intro = ({title, introDescription, products, onHide = null, introOptin, introLegals}) => {
	const locale = useLocale()
	const imageRef = useRef(null)
	const optinRef = useRef(null)
	const setSenderInfo = useFormStore(state => state.setSenderInfo)

	const {query: {locale: lc, dataset}} = useRouter()
	const currentLang = lc || process.env.NEXT_PUBLIC_LOCALE
	const currentDataset = dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET
	const isFrench = currentLang.includes('fr')

	const [style, api] = useSpring(() => ({
		from: {
			panelY: 'translate3d(0,100%,0)',
			cardY: 'translate3d(0,150%,0)',
		},
		to: {
			panelY: 'translate3d(0,0%,0)',
			cardY: 'translate3d(0,0%,0)',
		},
		config: (value) => ({
			duration: value === 'panelY' ? 2000 : 2400,
			easing: value === 'panelY' ? expoInOut : quartOut,
			restVelocity: 0.001,
		}),
	}))

	const rowCount = 6
	const renderCards = useCallback(() => {
		const rows = []
		let k = 0
		let sk = 0
		for (let i = 0; i < 6; i++) {
			const columns = []
			for (let j = 0; j < rowCount; j++) {
				if (j === 0) sk = k
				columns[j] = products[k++] || products[sk]
			}
			rows[i] = columns
		}
		return rows
	}, [products])

	const hide = () => {
		api.start({
			to: {
				panelY: 'translate3d(0,-100%,0)',
			},
		})

		if (onHide) onHide()
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = new FormData(e.currentTarget)
		setSenderInfo({
			name: data.get('name'),
			email: data.get('email'),
			// invitation: false,
			invitation: optinRef.current.checked,
		})
		const object = {
			locale: currentLang.replace('-', '_'),
			referral: process.env.NEXT_PUBLIC_SANITY_API_DATASET,
		}
		data.forEach(function (value, key) {
			object[key] = value
		})

		fetch('https://uckcdihdpb.execute-api.eu-west-3.amazonaws.com/default/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		}).then((res) => {
			return res.json()
		}).then((data) => {
			// console.log('Intro.js', data)
		}).catch((e) => {
			console.error(e)
		})

		hide()
	}

	return (
		<animated.aside className={styles.intro} style={{transform: style.panelY}}>
			<div className={styles.scroll}>
				<animated.div className={styles.card} style={{transform: style.cardY}}>
					<h2 className={currentDataset === 'octobre' ? 'hm-1b' : 'hm-1'}>{title}</h2>
					<div className={styles.content}>
						<img
							className={styles.message}
							src={`/la-liste/images/title-share-win-${isFrench ? 'fr' : 'en'}.png`}
							alt={isFrench ? 'Partagez et gagnez votre Wishlist' : 'Share and win your Wishlist'}
							width={isFrench ? 336 : 200}
							height={isFrench ? 102 : 91} />
						<p className={cn('pm-m pd-m', styles.description)}>{introDescription}</p>
						<form className={styles.form} onSubmit={handleSubmit}>
							<Input type='text' name='name' placeholder={locale('Prénom')} className={styles.input} required />
							<Input type='email' name='email' placeholder={locale('Adresse e-mail')} className={styles.input} required />
							<Checkbox ref={optinRef} className={cn(styles.input, styles.checkbox, styles.invitation)} id='invitation' name='invitation'>
								<p className={cn('pm-xxs')}>
									{introOptin}
								</p>
							</Checkbox>
							<Checkbox ref={optinRef} className={cn(styles.input, styles.checkbox)} id='consent' name='consent' required>
								<CustomBlockContent blocks={introLegals} className={styles.legals} />
							</Checkbox>
							<Button type='submit' variant={ButtonVariant.rect} className={styles.button}><Locale>Créer ma liste</Locale></Button>
						</form>
						{/* <CustomBlockContent blocks={introLegals} className={styles.legals} /> */}
					</div>
					<span className={cn(currentDataset === 'octobre' ? 'hm-1b' : 'hm-1', styles.titleSplit)}>
						{currentDataset === 'octobre' ? 'Octobre' : 'Sezane'}
					</span>
				</animated.div>
			</div>
			<div className={cn(styles.background)}>
				<div className='container'>
					{renderCards().map((cols, i) => (
						<div key={i} className={styles.column}>
							{cols.map((product, j) => (
								<CloudinaryImage
									ref={i === 0 && j === 0 ? imageRef : null}
									key={`${product._id}${j}`}
									src={product.image}
									className={styles.image}
									width={206}
									height={295}
									desktopWidth={206}
									mobileWidth={122} priority />
							))}
							{cols.map((product, j) => (
								<CloudinaryImage
									ref={i === 0 && j === 0 ? imageRef : null}
									key={`${product._id}${j}`}
									src={product.image}
									className={styles.image}
									width={206}
									height={295}
									desktopWidth={206}
									mobileWidth={122} priority />
							))}
						</div>
					))}
				</div>
			</div>
		</animated.aside>
	)
}

export default Intro
