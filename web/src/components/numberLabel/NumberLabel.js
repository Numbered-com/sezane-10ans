import styles from './numberLabel.module.scss'

/** @param {NumberLabelPropsType} props */
const NumberLabel = ({label, number}) => {
	return (
		<>
			<p className={styles.number}>
				{number
					.split(/(\+)/g)
					.map((word, index) =>
						word === '+' ? <sub key={index}>+</sub> : word,
					)}
			</p>
			<p className='pm-m'>{label}</p>
		</>
	)
}

/**
 * @typedef {Object} NumberLabelPropsType
 * @property {String} label
 * @property {String} number
 */

export default NumberLabel
