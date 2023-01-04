import {cn} from 'utils/classnames'
import styles from './input.module.scss'

const Input = ({className = null, type, name, placeholder = null, required = false, onChange = null, inputRef = null}) => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<input className={cn('hm-5', styles.input)} type={type} name={name} placeholder={placeholder} required={required} onChange={onChange} ref={inputRef} />
			{required && <span className={cn('pm-m', styles.required)}>*</span>}
		</div>
	)
}

export default Input
