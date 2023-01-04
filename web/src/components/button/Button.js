import {forwardRef} from 'react'
import Spinner from 'components/spinner/spinner'
import {cn} from 'utils/classnames'
import styles from './button.module.scss'

export const ButtonVariant = {
	rect: 'rect',
	rectWhite: 'rectWhite',
}

const Button = ({children, variant, color, disabled = null, type = 'button', enableLoader, loading, onClick, as, href, className, id, label, ...rest}, ref) => {
	const Tag = as || (href ? 'a' : 'button')
	const rel = href && href.indexOf('http') !== -1 ? 'noopener noreferrer' : null

	return (
		<Tag
			id={id}
			className={cn(styles.btn, styles[variant], styles[color], loading && styles.isLoading, className)}
			rel={rel}
			ref={ref}
			href={href}
			disabled={disabled}
			type={Tag === 'button' ? type : null}
			onClick={onClick}
			aria-label={label}
			{...rest}>
			{children && enableLoader ? (
				<span className={styles.children}>{children}</span>
			) : (children && children)}
			{enableLoader && <Spinner className={styles.spinner} />}
		</Tag>
	)
}

export default forwardRef(Button)
