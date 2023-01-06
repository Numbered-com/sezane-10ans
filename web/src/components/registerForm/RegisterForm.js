import {useRouter} from 'next/router'
import Button, {ButtonVariant} from 'components/button/Button'
import Checkbox from 'components/checkbox/Checkbox'
import CustomBlockContent from 'components/customBlockContent/customBlockContent'
import {CloudinaryImage} from 'components/image/Image'
import Input from 'components/input/Input'
import Locale from 'components/locale/Locale'
import useLocale from 'hooks/useLocale'
import {useRef} from 'react'
import useFormStore from 'stores/useFormStore'
import {cn} from 'utils/classnames'
import styles from './registerForm.module.scss'

const RegisterForm = ({formSurtitle, formTitle, formDescription, formImage, formOptin1, formOptin2, onSubmit}) => {
	const locale = useLocale()
	const optin1Ref = useRef(null)
	const optin2Ref = useRef(null)
	const setSenderInfo = useFormStore(state => state.setSenderInfo)

	const {query: {locale: lc, dataset}} = useRouter()
	const currentLang = lc || process.env.NEXT_PUBLIC_LOCALE
	// const currentDataset = dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = new FormData(e.currentTarget)
		setSenderInfo({
			name: data.get('name'),
			email: data.get('email'),
			// invitation: false,
			invitation: optin1Ref.current.checked,
		})
		const object = {
			locale: currentLang.replace('-', '_'),
			referral: process.env.NEXT_PUBLIC_SANITY_API_DATASET,
		}
		data.forEach(function (value, key) {
			object[key] = value
		})

		fetch('https://sa31mci2pi.execute-api.eu-west-3.amazonaws.com/default/10ans-register-user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(object),
		}).then((res) => {
			return res.json()
		}).then((data) => {
			console.log('Intro.js', data)
			if (onSubmit) onSubmit()
		}).catch((e) => {
			console.error(e)
		})
	}

	return (
		<div className={styles.registerForm}>

			<CloudinaryImage src={formImage} width={720} height={810} className={styles.background} layout='fill' objectFit='cover' />

			<div className={styles.card}>
				{formSurtitle && <span className='pm-m pd-md italic'>{formSurtitle}</span>}
				<h2 className='hm-2'>{formTitle}</h2>
				<div className={styles.content}>
					<p className={cn('pm-m pd-md italic', styles.description)}>{formDescription}</p>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Input type='text' name='name' placeholder={locale('Prénom')} className={styles.input} required />
						<Input type='email' name='email' placeholder={locale('Adresse e-mail')} className={styles.input} required />
						<Checkbox ref={optin1Ref} className={cn(styles.input, styles.checkbox, styles.invitation)} id='invitation' name='invitation'>
							<CustomBlockContent blocks={formOptin1} className={styles.legals} />
						</Checkbox>
						<Checkbox ref={optin2Ref} className={cn(styles.input, styles.checkbox)} id='consent' name='consent' required>
							<CustomBlockContent blocks={formOptin2} className={styles.legals} />
						</Checkbox>
						<Button type='submit' variant={ButtonVariant.rect} className={styles.button}><Locale>Je tente ma chance</Locale></Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
