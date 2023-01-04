import Link from 'next/link'
import {useRouter} from 'next/router'
import {cn} from 'utils/classnames'
import rewritify from 'utils/rewritify'
import styles from './customLink.module.scss'

const CustomLink = ({href, children = null, label = null, className = null, active = false, canActivate = false, onClick = null, noStyle = false, scroll = false}) => {
	const router = useRouter()

	return (
		<Link href={rewritify(href)} scroll={scroll}>
			<a className={cn(!noStyle && styles.underlined, (active || (canActivate && router.asPath === href)) && styles.isActive, className)} onClick={onClick}>
				{children || label}
			</a>
		</Link>
	)
}

export default CustomLink
