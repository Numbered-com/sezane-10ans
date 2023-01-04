import Button from 'components/button/Button'
import {useRef, useState} from 'react'
import styles from './contactForm.module.scss'
import Input from 'components/input/Input'
import TextArea from 'components/textarea/Textarea'
import Select from 'components/select/Select'
import Checkbox from 'components/checkbox/Checkbox'
import {cn} from 'utils/classnames'

const ContactForm = ({optinLabel, errorMessage, successMessage}) => {
	const formRef = useRef()
	const [isProcessing, setIsProcessing] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		// setIsSuccess(false)
		// setIsError(false)

		const form = e.currentTarget
		const formData = new FormData(form)

		const fields = Array.from(formData.entries()).map(entry => ({name: entry[0], value: entry[1]}))

		const response = await fetch(form.action, {
			method: form.method,
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				context: {pageName: 'website'},
				skipValidation: true,
				fields,
			}),
		})
		setIsProcessing(false)

		if (response.status === 200) {
			form.reset()
			setIsSuccess(true)
		} else {
			setIsError(true)
		}

		setTimeout(() => {
			setIsError(false)
			setIsSuccess(false)
		}, 3000)
	}

	return (
		<form
			className={styles.contactForm}
			ref={formRef}
			action='https://api.hsforms.com/submissions/v3/integration/submit/7369679/656177e1-e90a-435a-b076-946f6c1ab32e'
			method='POST'
			onSubmit={handleSubmit}>
			<Input className={styles.input} type='text' name='name' placeholder='Your name' required />
			<Select
				name='inquiry_type'
				className={styles.input}
				options={[
					{name: 'Press', value: 'press'},
					{name: 'Other', value: 'other'},
				]}
				placeholder='Your inquiry'
				variant='transparent' />
			<Input className={styles.input} type='email' name='email' placeholder='Your e-mail address' required />
			<Input className={styles.input} type='tel' name='phone' placeholder='Your phone number' />
			<Input className={styles.input} type='text' name='company' placeholder='Your company' />
			<TextArea className={styles.input} name='message' placeholder='Your message' />
			<Checkbox className={styles.input} name='LEGAL_CONSENT.subscription_type_8833769' required>
				{optinLabel}
			</Checkbox>

			<Button className={cn(styles.button, isSuccess && styles.isSuccess, isError && styles.isError)} variant='rounded black' type='submit' disabled={isProcessing}>
				<span className={cn(styles.message, styles.label)}>Send your message</span>
				<span className={cn(styles.message, styles.error)}>{errorMessage}</span>
				<span className={cn(styles.message, styles.success)}>{successMessage}</span>
			</Button>
		</form>
	)
}

export default ContactForm
