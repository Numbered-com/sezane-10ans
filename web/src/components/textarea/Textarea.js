import styles from './textarea.module.scss'
import cn from 'classnames'
import {forwardRef} from 'react'

const Textarea = ({name, placeholder = null, maxLength = null, className = null, onChange = null}, ref) => {
	return (
		<textarea
			ref={ref}
			name={name}
			className={cn(styles.textarea, 'hm-5', className)}
			maxLength={maxLength}
			placeholder={placeholder}
			onChange={onChange} />
	)
}

export default forwardRef(Textarea)
