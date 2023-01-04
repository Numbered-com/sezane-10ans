import styles from './spinner.module.scss'
import cn from 'classnames'

const Spinner = ({className}) => (
	<span className={cn(styles.spinner, className)} />
)

export default Spinner
