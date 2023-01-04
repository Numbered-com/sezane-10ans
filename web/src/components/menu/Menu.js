import Link from 'next/link'
import shallow from 'zustand/shallow'
import useMenuStore from 'stores/useMenuStore'
import {cn} from 'utils/classnames'
import PatternField, {PatternFieldVariant} from 'components/patternField/PatternField'
import styles from './menu.module.scss'

const Menu = ({linksPrimary = [], linksSecondary = []}) => {
	const [isMenuOpen, setIsMenuOpen] = useMenuStore(state => [state.isMenuOpen, state.setIsMenuOpen], shallow)

	const handleClickLink = () => {
		setIsMenuOpen(false)
	}

	return (
		<nav className={cn(styles.menu, isMenuOpen && styles.isActive)}>
			<PatternField className={styles.field} variant={PatternFieldVariant.black} />
			<div className={styles.links}>
				<ul className={styles.linksSecondary}>
					{linksSecondary.map(link => (
						<li key={link.key} className={styles.item}>
							<Link href={`/${link.slug}`}>
								<a className='hm-5 a--underlined' onClick={handleClickLink}>{link.label}</a>
							</Link>
						</li>
					))}
				</ul>
				<ul className={styles.linksPrimary}>
					{linksPrimary.map(link => (
						<li key={link.key}>
							<Link href={`/${link.slug}`}>
								<a className='hm-2 a--underlined' onClick={handleClickLink}>{link.label}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Menu
