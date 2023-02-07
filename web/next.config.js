const fs = require('fs')
const rewrites = require('./rewrites')

const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})
// const withPWA = require('next-pwa')

module.exports = withPlugins(
	[
		[withBundleAnalyzer],
		// [withPWA],
	],
	{
		// swcMinify: true,
		// pwa: {
		// 	disable: process.env.NODE_ENV !== 'production' || process.env.ANALYZE === 'true',
		// 	dest: 'public',
		// 	runtimeCaching: require('./pwa.config'),
		// },
		// experimental: {
		// 	optimizeCss: {
		// 		minimumExternalSize: 80000,
		// 		reduceInlineStyles: true,
		// 		pruneSource: true,
		// 		fonts: true,
		// 	},
		// },
		// i18n: {
		// 	locales: ['en-us', 'fr-fr'],
		// 	defaultLocale: 'en-us',
		// 	localeDetection: false,
		// },
		assetPrefix: process.env.NEXT_PUBLIC_BUILD ? `/reve-de-fevrier/${process.env.NEXT_PUBLIC_LOCALE.replace('_', '-')}` : '',
		sassOptions: {
			prependData: `
				@use "sass:math";
				$debug: ${process.env.NODE_ENV !== 'production'};
				@import 'styles/global.scss';
			`,
		},
		images: {
			deviceSizes: [1, 640, 960, 1200, 1920],
			imageSizes: [48, 96, 160, 320],
			domains: ['cdn.sanity.io'],
			loader: 'custom',
		},
		eslint: {
			ignoreDuringBuilds: true,
		},
		webpack: (config, {webpack}) => {
			// if (process.env.NODE_ENV === 'production') {
			// 	// replace react by preact
			// 	config.resolve.alias = {
			// 		...config.resolve.alias,
			// 		react: 'preact/compat',
			// 		'react-dom': 'preact/compat',
			// 		'react-render-to-string': 'preact-render-to-string',
			// 		'react-ssr-prepass': 'preact-ssr-prepass'
			// 	}
			// }

			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			})

			if (process.env.NODE_ENV !== 'production') {
			// conditional compilation
				config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^((?!node_modules).)*.js$/, (resource) => {
					const createData = resource.createData
					if (createData.resourceResolveData && createData.resourceResolveData.context) {
						const replaceExtension = (s, t, r) => {
							const p = s.lastIndexOf('.' + t)
							if (p === -1) { return s + '.' + r } else { return s.substr(0, p) + '.' + r }
						}

						// check for dev file
						const altPath = replaceExtension(createData.resourceResolveData.path, 'js', 'dev.js')

						if (fs.existsSync(altPath) && altPath !== createData.resourceResolveData.context.issuer) {
							resource.createData.resource = replaceExtension(createData.resource, 'js', 'dev.js')
							resource.createData.request = replaceExtension(createData.request, 'js', 'dev.js')
						}
					}
				}))
			}

			return config
		},
		async headers () {
			return [
				{
					source: '/(.*).jpg',
					headers: [
						{
							key: 'Cache-Control',
							value: 'public, max-age=31556952, s-maxage=31556952, stale-while-revalidate=31556952',
						},
					],
				},
				{
					source: '/(.*).png',
					headers: [
						{
							key: 'Cache-Control',
							value: 'public, max-age=31556952, s-maxage=31556952, stale-while-revalidate=31556952',
						},
					],
				},
			]
		},
		rewrites,
	})
