import {cdnClient, client} from './sanity'
import sanityImage from '@sanity/image-url'
import sanityClient from '@sanity/client'

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

const locale = {current: 'en_us'}
const defaultLocale = {current: 'en_us'}
export const setLocale = (value, defaultValue) => {
	if (value) locale.current = value
	if (defaultValue) defaultLocale.current = defaultValue
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
 * @param {*} value
 */
const localize = (value) => {
	const languages = [locale.current, defaultLocale.current]

	if (Array.isArray(value)) {
		return value.map(v => localize(v))
	} else if (value && typeof value === 'object') {
		if (/^locale[A-Z]/.test(value._type)) {
			const language = languages.find(lang => value[lang])
			return value[language] || null
		}

		return Object.keys(value).reduce((result, key) => {
			result[key] = localize(value[key])
			return result
		}, {})
	}
	return value
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

	const results = await client.fetch(`*[_id in path("settings.*") ${excludeDraft(preview)}] {
		...,
		${getLinks('linksPrimary')},
		${getLinks('linksSecondary')},
		${footerLink('footerLinkDefault')},
		${getLinks('links')}
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
	return localize(result)
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
