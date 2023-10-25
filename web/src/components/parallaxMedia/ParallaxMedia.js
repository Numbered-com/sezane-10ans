
import styles from './parallaxMedia.module.scss'
import {cn} from 'utils/classnames'
import {forwardRef} from 'react'
import ScrollAnimation from 'components/scrollAnimation/ScrollAnimation'

export const ParallaxMedia = forwardRef(
	(
		{
			as = 'div',
			distance = 0,
			clip = true,
			offset = [
				[0.5, 0.5],
				[1, 0],
			],
			children,
			scrollProps = {},
			className = null,
			onChange = null,
			...rest
		},
		ref,
	) => {
		const Tag = as

		const handleTransform = (t, {height, viewport, inView, ratio}) => {
			const dTotal = 2 * distance
			const scrollDistance = (viewport.height - height) / 2
			const scrollDistanceTotal = viewport.height + height
			const deltaD = (scrollDistance * dTotal) / scrollDistanceTotal
			const scale = Math.max(1, (height + deltaD * 2) / height)

			if (onChange) onChange(ratio)
			return inView ? `translate3d(0,${t.y}px,0) scale(${scale})` : `translate(0,${t.y}px) scale(${scale})`
		}

		return (
			<Tag {...rest} className={cn(styles.tag, className, clip && styles.clip)} ref={ref}>
				<ScrollAnimation {...scrollProps} y={distance} offset={offset} transform={handleTransform}>
					{children}
				</ScrollAnimation>
			</Tag>
		)
	},
)
