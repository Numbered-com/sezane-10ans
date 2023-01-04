import {useRef} from 'react'
import styles from './header.module.scss'
import LogoSezane from '../../svgs/logo-sezane.svg'
import LogoOctobre from '../../svgs/logo-octobre.svg'
import {useRouter} from 'next/router'

const Header = () => {
	const ref = useRef(null)
	const router = useRouter()
	const dataset = router.query.dataset || process.env.NEXT_PUBLIC_SANITY_API_DATASET
	const locale = (router.query?.locale && router.query.locale.replace('-', '_')) || process.env.NEXT_PUBLIC_LOCALE

	let country = locale.split('_')[1]
	if (['da'].includes(country)) country = 'eu'
	if (['uk'].includes(country)) country = 'en'

	return (
		<header className={styles.header} ref={ref}>
			{dataset === 'octobre' ? (
				<>
					<a href={`https://www.octobre-editions.com/${country}`}><LogoOctobre className={styles.logo} /></a>
					<a href={`https://www.octobre-editions.com/${country}/collection`} className={styles.shop}>E-Shop</a>
				</>
			) : (
				<>
					<a href={`https://www.sezane.com/${country}`}><LogoSezane className={styles.logo} /></a>
					<a href={`https://www.sezane.com/${country}/collection`} className={styles.shop}>E-Shop</a>
				</>
			)}
		</header>
	)
}

export default Header
