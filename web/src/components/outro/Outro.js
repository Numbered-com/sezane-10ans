import {animated} from '@react-spring/web'
import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import useLocale from 'hooks/useLocale'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './outro.module.scss'

const Outro = ({title, description, image, onSubmit, onCancel, style, optin, ctaLabel}) => {
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
						{ctaLabel}
					</Button>
				</div>
			</form>

		</animated.section>
	)
}

export default Outro
