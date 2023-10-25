import {cdnClient, client} from './sanity'
import sanityImage from '@sanity/image-url'
import sanityClient from '@sanity/client'
import {deepCopy, WalkBuilder} from 'walkjs'

const options = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qoj23imy',
	dataset: process.env.NEXT_PUBLIC_SANITY_API_DATASET,
	useCdn: false,
	apiVersion: '2021-10-04',
	token: process.env.SANITY_API_TOKEN,
}

export const getClient = (preview, dataset) => sanityClient({...options, dataset})

// excluding draft is required if using an api key on non preview client
export const excludeDraft = (preview = false) => !preview ? '&& !(_id in path(\'drafts.**\'))' : ''

// -----------------------------------------------------o images

export const imageBuilder = sanityImage(cdnClient)

// -----------------------------------------------------o locales

const locale = {current: 'fr'}
const locales = {current: ['fr']}
const defaultLocale = {current: 'fr'}
export const setLocale = (value, defaultValue, list) => {
	if (value) locale.current = value
	if (defaultValue) defaultLocale.current = defaultValue
	if (list) locales.current = list
}

export async function getLocalisation () {
	const results = await client.fetch(`*[_type == 'locale']{'key': title, 'value': coalesce(${locale.current}, ${defaultLocale.current}, title)}`)
	const strings = {}
	results.forEach(element => {
		strings[element.key] = element.value || element.key
	})
	return strings
}

/**
 * Localize content
 * Fallbacks on default locale if content isn't translated
 * @param {*} nodes
 */
export const localize = (nodes) => {
	new WalkBuilder()
		.withGlobalFilter(x => /^locale[A-Z]/.test(x.val?._type) || (x.val?._type === 'object' && x.val?.[defaultLocale.current]))
		.withSimpleCallback(node => {
			// replace node with its localized value
			if (node?.parent?.val) {
				if (node.val?.[locale.current] || node.val?.[defaultLocale.current]) {
					node.parent.val[node.key] = node.val[locale.current] || node.val[defaultLocale.current]
				} else {
					delete node.parent.val[node.key]
				}
			}
		})
		.walk(nodes)

	return nodes
}

export const resolveReferences = async (input, preview = false, maxDepth = 2) => {
	const store = new Map()

	const replaceNode = (node, id) => {
		const doc = store.get(id)
		if (doc) {
			delete node._updatedAt
			delete node._rev

			if (
				['internalLink', 'internalLinkWithLabel', 'internalLinkWithSub'].includes(node.parent?.val?._type) ||
				node.parent?.val?.selectedTab === 'internalLink'
			) {
				const values = {
					slug: deepCopy(doc.slug),
					label: typeof node.parent?.val?.label === 'string'
						? node.parent?.val?.label
						: (node.parent?.val?.label || doc.title) && deepCopy(node.parent?.val?.label || doc.title),
					docType: doc._type,
				}

				const selectedTab = node.parent?.val?.selectedTab
				if (selectedTab) {
					values.selectedTab = selectedTab
				}

				const _key = node.val._key || node.parent.val._key || doc._key
				if (_key) {
					values._key = _key
				}

				Object.keys(node.parent.val).forEach(key => delete node.parent.val[key])
				Object.keys(values).forEach(key => {
					node.parent.val[key] = values[key]
				})
			} else {
				Object.keys(node.val).forEach(key => delete node.val[key])
				Object.keys(doc).forEach(key => {
					const value = doc[key]
					node.val[key] = typeof value === 'object' ? deepCopy(value) : value
				})
			}
		}
	}

	const iterate = async (nodes) => {
		const ids = new Map()

		new WalkBuilder()
			.withGlobalFilter(x => x.val?._type === 'reference')
			.withSimpleCallback(async (node) => {
				const refId = node.val._ref

				if (typeof refId !== 'string') {
					throw new Error('node.val._ref is not set')
				}

				if (!refId.startsWith('image-')) {
					if (!store.has(refId)) {
						// unresolved, add it to the list
						ids.set(refId, node)
					} else {
						// already resolved, can be replaced immediately
						replaceNode(node, refId)
					}
				}
			})
			.walk(nodes)

		if (ids.size) {
			// fetch all references at once
			const documents = await getClient(preview).fetch(`*[_id in [${[...ids.keys()].map(id => `'${id}'`).join(',')}]]{...}`)
			documents.forEach(element => {
				store.set(element._id, element)
			})

			// replace them
			ids.forEach((node, id) => {
				replaceNode(node, id)
			})

			if (!--maxDepth) {
				console.warn(`Sanity autoresolver max depth reached`)
				return
			}

			// iterate threw newly fetched nodes
			await iterate(nodes)
		}
	}

	await iterate(input)
}

export const resolveAndLocalize = async (result, preview = false, maxDepth = 2) => {
	await resolveReferences(result, preview, maxDepth)
	localize(result)
}

// -----------------------------------------------------o fields

const footerLink = (field = 'footerLink') => `${field}{
	label,
	'slug': reference->slug.current
}`

const slugField = `'slug': slug.current`

// -----------------------------------------------------o settings

export async function getSettings (preview) {
	const getLinks = field => `${field}[]{
		'key': _key,
		label,
		'slug': reference->slug.current
	}`

	const results = await client.fetch(`*[_id == 'settings.general' ${excludeDraft(preview)}] {
		...,
	}`)

	return localize(results)
}

// -----------------------------------------------------o documents

export async function getDocumentById (id, preview) {
	const results = await getClient(preview)
		.fetch(`*[_id == '${id}' ${excludeDraft(preview)}]{
			_type,
			${slugField}
		}[0]`)
	return results
}

export async function getDocumentPaths (type) {
	const results = await getClient()
		.fetch(/* groq */`*[_type == '${type}' && defined(slug) ${excludeDraft()}]{
			'params': {${slugField}}
		}`)
	return results
}

// -----------------------------------------------------o pages

export async function getPageById (id, preview) {
	const result = await getClient(preview)
		.fetch(`*[_id == '${id}' ${excludeDraft(preview)}][0]`)
	return localize(result)
}

export async function getHome (preview, dataset) {
	const result = await getClient(preview, dataset)
		.fetch(/* groq */`*[_id == 'page-home' ${excludeDraft(preview)}]{
			...,
		}[0]`)
	await resolveAndLocalize(result, preview)

	return result
}

export async function getPageBySlug (slug, preview) {
	const results = await getClient(preview)
		.fetch(`*[_type == 'page' && slug.current == '${slug}' ${excludeDraft(preview)}][0]`)
	return localize(results)
}

export async function get404 (preview) {
	const results = await getClient(preview)
		.fetch(`*[_id == 'error-page-404' ${excludeDraft()}]{
			...
		}[0]`)
	return localize(results)
}

export async function getProducts (preview, dataset) {
	const results = await getClient(preview, dataset)
		.fetch(`*[_type == 'product' ${excludeDraft(preview)}]|order(order asc){
			...,
			sizes[]->{
				_id,
				title
			}
		}`)
	return localize(results)
}
