import NextImage from 'next/image'
import {
	forwardRef,
	useState,
} from 'react'
// import {
// 	imageBuilder,
// } from 'lib/api'
import {
	cn,
} from 'utils/classnames'
import styles from './image.module.scss'

export const Image = forwardRef(({src, width, height, mobileWidth = 375, desktopWidth = 1440, alt = '', layout = 'responsive', className = null, as = null, style = null, loader = undefined, loading = 'lazy', priority = false, objectFit}, ref) => {
	const [isLoaded, setIsLoaded] = useState(priority)
	const mobileMockupWidth = 375
	const desktopMockupWidth = 1440
	const sizes = `${desktopMockupWidth && `(min-width: ${desktopMockupWidth}px) ${Math.round(desktopWidth * 100 / desktopMockupWidth)}vw`}${mobileWidth ? `,${Math.round(mobileWidth * 100 / mobileMockupWidth)}vw` : ''}`
	const Tag = as || 'div'

	const onLoad = () => {
		setIsLoaded(true)
	}

	return (
		<Tag ref={ref} className={cn(styles.image, isLoaded && styles.isLoaded, className)} style={style}>
			<NextImage
				onLoadingComplete={onLoad}
				src={src}
				alt={alt}
				layout={layout}
				sizes={sizes}
				width={width}
				height={height}
				loader={loader}
				objectFit={objectFit}
				// loading={loading}
				priority={priority}
				lazyBoundary='50%' />
		</Tag>
	)
})

// export const LocalImage = ({image, mobileWidth = 375, desktopWidth = 1440, alt = '', layout = 'responsive', className = null, as = null, style = null, loading = 'lazy'}) => {
// 	return (
// 		<Image
// 			src={image.src}
// 			width={image.width}
// 			height={image.height}
// 			mobileWidth={mobileWidth}
// 			desktopWidth={desktopWidth}
// 			as={as}
// 			layout={layout}
// 			className={className}
// 			style={style}
// 			loading={loading}
// 			alt={alt} />
// 	)
// }

// export const SanityImage = ({image, ratio = null, alt = '', mobileWidth = 375, desktopWidth = 1440, layout = 'responsive', className = null, as = null, style = null, loading = 'lazy'}) => {
// 	const refSplit = image.asset._ref.split('-')
// 	const dimensions = refSplit[refSplit.length - 2].split('x')
// 	const aspectRatio = ratio || dimensions[0] / dimensions[1]

// 	const sanityLoader = ({width, quality}) => {
// 		return imageBuilder.image(image).size(width | 0, width / aspectRatio | 0).fit('crop').quality(quality).auto('format').url()
// 	}

// 	return (
// 		<Image
// 			src='empty'
// 			loader={sanityLoader}
// 			width={dimensions[0]}
// 			height={dimensions[0] / aspectRatio}
// 			mobileWidth={mobileWidth}
// 			desktopWidth={desktopWidth}
// 			as={as}
// 			layout={layout}
// 			className={className}
// 			style={style}
// 			loading={loading}
// 			alt={alt} />
// 	)
// }

export const CloudinaryImage = forwardRef(({src, width, height, alt = '', mobileWidth = 375, desktopWidth = 1440, layout = 'responsive', className = null, as = null, style = null, loading = 'lazy', priority = false, objectFit, ...rest}, ref) => {
	const aspectRatio = width / height

	const cloudinaryLoader = ({width, quality}) => {
		return src.split('/upload/').join(`/upload/f_auto,c_fill,w_${width | 0},h_${width / aspectRatio | 0}/`)
	}

	return (
		<Image
			ref={ref}
			src='empty'
			loader={cloudinaryLoader}
			width={width}
			height={height}
			mobileWidth={mobileWidth}
			desktopWidth={desktopWidth}
			as={as}
			layout={layout}
			className={className}
			style={style}
			priority={priority}
			objectFit={objectFit}
			alt={alt}
			{...rest} />
	)
})
