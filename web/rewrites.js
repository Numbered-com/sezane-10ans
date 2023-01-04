const fs = require('fs/promises')
const sanity = require('./src/lib/sanity')

const excludes = ['api', '404', '[slug]', '_app', '_document', '_error', 'index']

const rewrites = async () => {
	// get a list of directory and files
	const files = await fs.readdir('./src/pages')

	// remove scss files, excluded js files and directories
	// remove `.js` extension from filenames
	const pages = files
		.filter(file => file.endsWith('.js') && !excludes.some(exclude => file.includes(exclude)))
		.map(file => file.replace('.js', ''))

	// select only directories by removing files with extension
	const posts = files.filter(file => !file.includes('.') && !excludes.includes(file))

	/**
	 * Get list of pages that got a `slug` field
	 * @type {Array<{id: String, slug: String}}>}
	 */
	const results = await sanity.client.fetch(`*[defined(slug)
		&& !(_type in ["article", "company", "employee", "fund"])
		&& !(_id in path("drafts.**"))]{
			_type,
			'id': _id,
			'slug': slug.current
		}`)

	// map slug from Sanity on Next's pages based on Sanity id
	const rewritesPages = results.map(result => {
		const slug = result.slug
		const id = result.id.replace('page-', '')
		const page = pages.find(page => page === id)

		return page
			? {source: '/' + slug, destination: '/' + page}
			: null
	}).filter(object => object)

	// same as before but for posts
	const rewritesPosts = results.map(result => {
		const slug = result.slug
		const id = result.id.replace('page-', '')
		const post = posts.find(post => post === id)

		return post
			? {source: `/${slug}/:slug`, destination: `/${post}/:slug`}
			: null
	}).filter(object => object)

	const rewrites = [...rewritesPages, ...rewritesPosts]

	const rewritesData = JSON.stringify(rewrites.map(r => ({
		source: r.source.replace(':slug', ''),
		destination: r.destination.replace(':slug', ''),
	})))
	await fs.writeFile(
		'./src/utils/rewritify.js',
		/* js */`/* === AUTO GENERATED FILE === */
/* eslint-disable */
const rewrites = ${rewritesData}

export default function rewritify (route = '') {
	const page = rewrites.find(rewrite => route.startsWith(rewrite.destination))

	return page
		? route.replace(page.destination, page.source)
		: route
}
`)

	console.log('Log: -> rewrites() -> rewrites', rewrites)

	return rewrites
}

module.exports = rewrites
