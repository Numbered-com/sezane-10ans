// import {defaultLanguage} from './schemas/locale/supportedLanguages'

const previewSecret = '0RtXsk9MjYP1LkaKW6O0RtX80hA' // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = 'http://localhost:3000'

export default function resolveProductionUrl (document) {
	if (document.slug) {
		// const slug = document._type + '/' + document.slug[defaultLanguage.id].current
		return `${projectUrl}/api/preview?secret=${previewSecret}&id=${document._id}`
	}

	return null
}
