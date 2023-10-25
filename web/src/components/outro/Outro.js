import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import useLocale from 'hooks/useLocale'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './outro.module.scss'
import {forwardRef, useRef, useState} from 'react'
import Locale from 'components/locale/Locale'

const Outro = ({title, description, image, onSubmit, onCancel, style, optin, ctaLabel, isOpened}, ref) => {
	const {query: {locale: lc, dataset}} = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const currentLang = lc || process.env.NEXT_PUBLIC_LOCALE
	const locale = useLocale()
	const formRef = useRef()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setSuccess(false)
		setIsLoading(true)

		const data = new FormData(e.currentTarget)

		const object = {
			locale: currentLang.replace('-', '_'),
			collection: 'sezane', // dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET,
			senderName: useFormStore.getState().senderName,
			recipient: {email: data.get('email'), name: data.get('name')},
		}

		// await fetch('https://uckcdihdpb.execute-api.eu-west-3.amazonaws.com/default/send', {
		await fetch('https://sa31mci2pi.execute-api.eu-west-3.amazonaws.com/default/10ans-send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		}).then((res) => {
			return res.json()
		}).then((data) => {
			console.log(data)
			setSuccess(true)
			formRef.current.reset()
			setTimeout(() => {
				setSuccess(false)
			}, 2000)
		}).catch((e) => {
			console.error(e)
		})

		setIsLoading(false)

		window.location.href = 'https://www.sezane.com'
		if (onSubmit) onSubmit()
	}

	return (
		<section className={cn(styles.outro, isOpened && styles.isOpened)} style={style} ref={ref}>
			<figure className={styles.figure}>
				{image && (
					<CloudinaryImage
						src={image}
						className={styles.image}
						width={375}
						height={331} />
				)}

				<figcaption className='mobile-only'>
					<h2 className={cn(styles.title, 'hm-2')}>
						{title}
					</h2>
				</figcaption>
			</figure>
			<form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
				<span className={cn(styles.title, 'hm-2 desktop-only')} aria-hidden>
					{title}
				</span>
				{description && (
					<p className='pm-m pd-md italic'>
						{description}
					</p>
				)}
				<div className={cn(styles.formContent, success && styles.success)}>
					<Input type='text' name='name' placeholder={locale('Firstname')} className={styles.input} required={false} />
					<Input type='email' name='email' placeholder={locale('E-mail address')} className={styles.input} required />
					{/* <Checkbox className={cn(styles.input, styles.check, styles.checkbox)} id='consent' name='consent' required>
						<CustomBlockContent blocks={optin} className='pd-s' />
					</Checkbox> */}

					<div className={styles.cta}>
						<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={isLoading}>
							{ctaLabel}
						</Button>
						<div className={cn('pm-m pd-md italic', styles.message, styles.messageSuccess)}><Locale>Message sent!</Locale></div>
					</div>
				</div>
			</form>

		</section>
	)
}

export default forwardRef(Outro)
