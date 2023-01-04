import {animated} from '@react-spring/web'
import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import Locale from 'components/locale/Locale'
import useLocale from 'hooks/useLocale'
import {useRef, useState} from 'react'
import {Accordion, AccordionItem, AccordionItemPanel} from 'react-accessible-accordion'
import useCartStore from 'stores/useCartStore'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './outro.module.scss'

const Step = ({index, onNext = null, onOpen = null, subtitle = null, optin = null, outroHelp = null, ...rest}) => {
	const locale = useLocale()
	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const optinRef = useRef(null)
	const [locked, setLocked] = useState(false)

	const handleNext = () => {
		if (onNext) onNext(index)
	}

	const handleClick = () => {
		if (onOpen && !locked) onOpen(index)
	}

	// const handleInputChange = (e) => {
	// 	if (locked && nameRef.current.validity.valid && emailRef.current.validity.valid) setLocked(false)
	// 	else if (!locked && (!nameRef.current.validity.valid || !emailRef.current.validity.valid)) setLocked(true)
	// }

	return (
		<AccordionItem uuid={index} {...rest}>
			<AccordionItemPanel>
				<div className='accordion__content'>
					{subtitle && (
						<p className={cn('pm-m pd-m', styles.description)}>
							{subtitle}
						</p>
					)}
					<Input type='text' name={`name[${index}]`} placeholder={locale('Prénom')} className={styles.input} inputRef={nameRef} required={index === 1} />
					<Input type='email' name={`email[${index}]`} placeholder={locale('Adresse e-mail')} className={styles.input} inputRef={emailRef} required={index === 1} />
					{index === 3 ? (
						<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={locked}>
							<Locale>Envoyer</Locale>
						</Button>
					) : (
						<div className={styles.buttons}>
							{/* <Checkbox ref={optinRef} className={cn(styles.input, styles.check, styles.checkbox)} id='consent' name='consent' required>
								<p className='pd-s'>
									{optin}
								</p>
							</Checkbox> */}
							<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={locked}>
								<Locale>Envoyer</Locale>
							</Button>
						</div>
					)}
				</div>
			</AccordionItemPanel>
		</AccordionItem>
	)
}

const Outro = ({subtitle, image, onSubmit, onCancel, style, outroHelp, optin}) => {
	const [index, setIndex] = useState(1)
	const {query: {locale: lc, dataset}} = useRouter()
	const currentLang = lc || process.env.NEXT_PUBLIC_LOCALE
	const isFrench = currentLang.includes('fr')

	const handleNext = (i) => {
		setIndex(i + 1)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = new FormData(e.currentTarget)

		console.log('Outro.js', lc, dataset)
		const object = {
			locale: currentLang.replace('-', '_'),
			collection: dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET,
			senderName: useFormStore.getState().senderName,
			recipients: [
				{email: data.get('email[1]'), name: data.get('name[1]')},
				{email: data.get('email[2]'), name: data.get('name[2]')},
				{email: data.get('email[3]'), name: data.get('name[3]')},
			],
			products: useCartStore.getState().products.map((p) => ({
				image: p.image,
				title: p.title,
				variant: p.variant,
				price: p.price,
				size: p.size || '',
				url: p.shopUrl,
			})),
		}

		fetch('https://uckcdihdpb.execute-api.eu-west-3.amazonaws.com/default/send', {
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

		if (onSubmit) onSubmit()
	}

	const handleOpen = (index) => {
		setIndex(index)
	}

	const handleClose = (index) => {
		if (onCancel) onCancel()
	}

	return (
		<animated.section className={styles.outro} style={style}>
			<div className={styles.content}>
				<Button className={cn('hm-3a', styles.close)} onClick={handleClose}><Locale>Revenir à ma wishlist</Locale></Button>
				<div className={styles.figure}>
					{image && (
						<CloudinaryImage
							src={image}
							className={styles.image}
							width={704}
							height={676}
							desktopWidth={363}
							mobileWidth={122} />
					)}
					{/* <div className={styles.titles}>
						<div className={cn('hm-3', styles.surtitle)}>{surtitle}</div>
						<div className={cn('hm-1 hd-1', styles.title)}>{title}</div>
						<div className={cn('hm-3', styles.subtitle)}>{subtitle}</div>
					</div> */}
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.message}>
						<img
							src={`/la-liste/images/title-share-${isFrench ? 'fr' : 'en'}.png`}
							alt={isFrench ? 'Partagez et gagnez votre Wishlist' : 'Share and win your Wishlist'}
							width={isFrench ? 336 : 239}
							height={isFrench ? 102 : 109} />
					</h2>
					{/* {outroSubtitle && (
						<p>
							{outroSubtitle}
						</p>
					)} */}
					<div className={styles.formContent}>
						<Accordion className={styles.accordion} preExpanded={[1]}>
							<Step index={1} subtitle={subtitle} optin={optin} onNext={handleNext} onOpen={handleOpen} dangerouslySetExpanded={index === 1} />
							{/* <Step index={2} onNext={handleNext} onOpen={handleOpen} dangerouslySetExpanded={index === 2} />
							<Step index={3} onOpen={handleOpen} dangerouslySetExpanded={index === 3} outroHelp={outroHelp} /> */}
							{outroHelp && <p className={cn('pm-xxs', styles.outroHelp)}>{outroHelp}</p>}
						</Accordion>
					</div>
				</form>
			</div>
		</animated.section>
	)
}

export default Outro
