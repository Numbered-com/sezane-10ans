import {SanityImage} from 'components/image/Image'
import Link from 'next/link'
import {cn} from 'utils/classnames'
import rewritify from 'utils/rewritify'
import Logo from '../../svgs/logo.svg'
import styles from './cardTeam.module.scss'

/** @param {CardTeamPropsType} props */
const CardTeam = ({slug, name, role, isPartner, image, displayPartner = false}) => {
	return (
		<Link href={rewritify('/team/' + slug)}>
			<a className={styles.cardTeam}>
				<div className={styles.wrapper}>
					{displayPartner && isPartner && <Logo className={styles.logo} />}
					{image && <SanityImage className={styles.image} image={image} desktopWidth={274} mobileWidth={310} ratio={274 / 365} />}
				</div>
				<p className='hm-5'>{name.firstName} {name.lastName}</p>
				<p className={cn('pm-xs', styles.role)}>{role}</p>
			</a>
		</Link>
	)
}

/**
 * @typedef {Object} CardTeamPropsType
 * @property {String} slug
 * @property {{firstName: String, lastName: String}} name
 * @property {String} role
 * @property {Boolean?} isPartner
 * @property {Object} image
 * @property {Boolean?} displayPartner
 */

export default CardTeam
