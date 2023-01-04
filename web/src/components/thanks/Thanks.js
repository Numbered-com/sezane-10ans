import {animated} from '@react-spring/web'
import Button, {ButtonVariant} from 'components/button/Button'
import {CloudinaryImage} from 'components/image/Image'
import Locale from 'components/locale/Locale'
import {cn} from 'utils/classnames'
import styles from './thanks.module.scss'

const Thanks = ({message, image, ctaUrl, thanksCtaLabel, style}) => {
	return (
		<animated.section className={styles.thanks} style={style}>
			<div className={styles.content}>
				<div className={styles.text}>
					<h2 className={cn('hm-1 hd-1', styles.title)}>
						{process.env.NEXT_PUBLIC_SANITY_API_DATASET === 'sezane' ? (
							<Locale>Pour lui</Locale>
						) : (
							<Locale>Pour elle</Locale>
						)}
					</h2>
					<p className={cn('pm-m', 'pd-md', styles.message)}>{message}</p>
					<Button variant={ButtonVariant.rect} className={styles.button} href={ctaUrl}>
						{thanksCtaLabel}
					</Button>
				</div>
			</div>
			{image && (
				<>
					<CloudinaryImage
						src={image}
						className={cn(styles.image, 'mobile-only')}
						width={375}
						height={759} />
					<CloudinaryImage
						src={image}
						className={cn(styles.image, 'desktop-only')}
						width={1440}
						height={810} />
				</>
			)}
		</animated.section>
	)
}

export default Thanks
