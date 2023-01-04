import {forwardRef} from 'react'
import styles from './checkbox.module.scss'
import cn from 'classnames'
import Checkmark from '../../svgs/checkmark.svg'
import CheckmarkGold from '../../svgs/checkmark-gold.svg'

const Checkbox = ({name, id, variant = null, checked = null, value = 'false', children = null, onChange = null, className = null, required = null}, ref) => {
	return (
		<div className={cn(styles.checkbox, styles[variant])}>
			<input type='checkbox' id={id} name={name} ref={ref} value={value} onChange={onChange} className={styles.input} required={required} checked={checked} readOnly={checked !== null} />
			<label htmlFor={id} className={cn('pm-xxs', styles.label, className)}>
				<span className={styles.box}>
					{variant === 'gold' ? (
						<CheckmarkGold className={styles.checkmark} />
					) : (
						<Checkmark className={styles.checkmark} />
					)}
				</span>
				<span>{children}</span>
			</label>
		</div>
	)
}

export default forwardRef(Checkbox)
