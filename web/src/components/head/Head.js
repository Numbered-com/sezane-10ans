import {imageBuilder} from 'lib/api'
import NextHead from 'next/head'
// import {useRouter} from 'next/router'

const Head = ({title = '', description = '', url = null, image = null}) => {
	// const router = useRouter()

	return (
		<NextHead>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no' />
			<title>{title}</title>
			<meta name='description' content={description} />

			{/* {router.locale && <meta property='og:locale' content={router.locale} />} */}
			<meta property='og:type' content='website' />
			{image && (
				<meta property='og:image' content={imageBuilder.image(image).size(1200, 630).url()} />
			)}
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			{url && <meta property='og:url' content={url} />}

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />

			<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='194x194' href='/favicon-194x194.png' />
			<link rel='icon' type='image/png' sizes='192x192' href='/favicon-android-chrome-192x192.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
			<link rel='mask-icon' href='/favicon-safari-pinned-tab.svg' />
			<meta name='theme-color' content='#ffffff' />
		</NextHead>
	)
}

export default Head
