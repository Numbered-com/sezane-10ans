import {animated} from '@react-spring/web'
import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import Locale from 'components/locale/Locale'
import useLocale from 'hooks/useLocale'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './outro.module.scss'
import Checkbox from 'components/checkbox/Checkbox'
import CustomBlockContent from 'components/customBlockContent/customBlockContent'

// const Step = ({index, onNext = null, onOpen = null, subtitle = null, optin = null, outroHelp = null, ...rest}) => {
// 	const locale = useLocale()
// 	const nameRef = useRef(null)
// 	const emailRef = useRef(null)
// 	const optinRef = useRef(null)
// 	const [locked, setLocked] = useState(false)

// 	const handleNext = () => {
// 		if (onNext) onNext(index)
// 	}

// 	const handleClick = () => {
// 		if (onOpen && !locked) onOpen(index)
// 	}

// 	// const handleInputChange = (e) => {
// 	// 	if (locked && nameRef.current.validity.valid && emailRef.current.validity.valid) setLocked(false)
// 	// 	else if (!locked && (!nameRef.current.validity.valid || !emailRef.current.validity.valid)) setLocked(true)
// 	// }

// 	return (
// 		<div {...rest}>
// 			<div className='accordion__content'>
// 				{subtitle && (
// 					<p className={cn('pm-m pd-m', styles.description)}>
// 						{subtitle}
// 					</p>
// 				)}
// 				<Input type='text' name={`name[${index}]`} placeholder={locale('Prénom')} className={styles.input} inputRef={nameRef} required={index === 1} />
// 				<Input type='email' name={`email[${index}]`} placeholder={locale('Adresse e-mail')} className={styles.input} inputRef={emailRef} required={index === 1} />
// 				{index === 3 ? (
// 					<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={locked}>
// 						<Locale>Envoyer</Locale>
// 					</Button>
// 				) : (
// 					<div className={styles.buttons}>
// 						{/* <Checkbox ref={optinRef} className={cn(styles.input, styles.check, styles.checkbox)} id='consent' name='consent' required>
// 								<p className='pd-s'>
// 									{optin}
// 								</p>
// 							</Checkbox> */}
// 						<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={locked}>
// 							<Locale>Envoyer</Locale>
// 						</Button>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

const Outro = ({title, description, image, onSubmit, onCancel, style, outroHelp, optin}) => {
	const {query: {locale: lc, dataset}} = useRouter()
	const currentLang = lc || process.env.NEXT_PUBLIC_LOCALE
	const locale = useLocale()

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = new FormData(e.currentTarget)

		const object = {
			locale: currentLang.replace('-', '_'),
			collection: 'sezane', // dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET,
			senderName: useFormStore.getState().senderName,
			recipient: {email: data.get('email'), name: data.get('name')},
			// products: useCartStore.getState().products.map((p) => ({
			// 	image: p.image,
			// 	title: p.title,
			// 	variant: p.variant,
			// 	price: p.price,
			// 	size: p.size || '',
			// 	url: p.shopUrl,
			// })),
		}

		fetch('https://sa31mci2pi.execute-api.eu-west-3.amazonaws.com/default/10ans-send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		}).then((res) => {
			return res.json()
		}).then((data) => {
			console.log('outro.js', data)
		}).catch((e) => {
			console.error(e)
		})

		if (onSubmit) onSubmit()
	}

	const handleClose = (index) => {
		if (onCancel) onCancel()
	}

	return (
		<animated.section className={styles.outro} style={style}>
			<div className={styles.figure}>
				{image && (
					<CloudinaryImage
						src={image}
						className={styles.image}
						width={1}
						height={1} />
				)}
			</div>
			{/* <Button className={cn('hm-3a', styles.close)} onClick={handleClose}><Locale>Revenir à ma wishlist</Locale></Button> */}
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2 className={cn(styles.message, 'hm-2')}>
					{title}
				</h2>
				{description && (
					<p className='pm-m pd-md italic'>
						{description}
					</p>
				)}
				<div className={styles.formContent}>
					<Input type='text' name='name' placeholder={locale('Prénom')} className={styles.input} required={false} />
					<Input type='email' name='email' placeholder={locale('Adresse e-mail')} className={styles.input} required />
					{/* <Checkbox className={cn(styles.input, styles.check, styles.checkbox)} id='consent' name='consent' required>
						<CustomBlockContent blocks={optin} className='pd-s' />
					</Checkbox> */}
					<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={false}>
						<Locale>Envoyer</Locale>
					</Button>
				</div>
			</form>

		</animated.section>
	)
}

export default Outro
