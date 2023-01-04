import {useRef, useState, useEffect, forwardRef} from 'react'
import cn from 'classnames'
import Arrow from '../../svgs/arrow-select.svg'
import styles from './select.module.scss'

export const SelectVariants = {
	white: 'white',
	black: 'black',
}

const Select = ({
	name,
	options,
	placeholder = null,
	required = false,
	className = null,
	label = null,
	onChange = null,
	variant = SelectVariants.black,
}, ref) => {
	const selectRef = useRef(null)
	const valueRef = useRef(null)

	const [selected, setSelected] = useState()
	const [title, setTitle] = useState(placeholder || options[0].name)

	useEffect(() => {
		if (selected) {
			setTitle(selectRef.current.options[selectRef.current.options.selectedIndex].textContent)

			if (onChange) {
				onChange(selectRef.current.options.selectedIndex)
			}
		}
	}, [selected, onChange])

	useEffect(() => {
		if (selectRef.current.form) selectRef.current.form.addEventListener('reset', handleResetForm)

		return () => {
			if (selectRef.current && selectRef.current.form) selectRef.current.form.removeEventListener('reset', handleResetForm)
		}
	}, [])

	const handleResetForm = () => {
		valueRef.current.textContent = selectRef.current.options[0].textContent
		setSelected(null)
	}

	const handleChange = () => {
		setSelected(selectRef.current.value)
	}

	return (
		<div className={cn(styles.select, selected && styles.isSelected, styles[variant], className)} ref={ref}>
			<select ref={selectRef} name={name} required={required} onChange={handleChange} aria-label={label || placeholder} defaultValue='none'>
				{placeholder && <option disabled value='none'>{placeholder}</option>}
				{options && options.map((e, i) => <option key={i} value={e.value} disabled={e.disabled} selected={e.selected}>{e.name}</option>)}
			</select>
			<span className={cn('hm-5', styles.value)} ref={valueRef}>
				{title}
				<Arrow />
			</span>
		</div>
	)
}

export default forwardRef(Select)
