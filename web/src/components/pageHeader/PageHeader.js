import PatternField, {PatternFieldVariant} from 'components/patternField/PatternField'
import {cn} from 'utils/classnames'
import Arrow from '../../svgs/arrow.svg'
import styles from './pageHeader.module.scss'

export const PageHeaderVariant = {
	layout: {
		left: 'left',
		bottomLeft: 'bottomLeft',
		center: 'center',
	},
	color: {
		white: PatternFieldVariant.white,
		black: PatternFieldVariant.black,
	},
}

const PageHeader = ({
	children,
	variantLayout = PageHeaderVariant.layout.bottomLeft,
	variantColor = PageHeaderVariant.color.black,
	withPattern = false,
	withArrow = false,
}) => {
	return (
		<header className={cn('container padding', styles.pageHeader, styles[variantLayout], styles[variantColor])}>
			{withPattern && <PatternField className={styles.pattern} variant={PatternFieldVariant[variantColor]} />}
			<div className={styles.wrapper}>
				{children}
				{withArrow && <Arrow className={cn(styles.arrow, 'desktop-only')} />}
			</div>
		</header>
	)
}

export default PageHeader
