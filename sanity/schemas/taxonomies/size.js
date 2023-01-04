import {FaTag} from 'react-icons/fa'
import {defaultLanguage} from '../locale/supportedLanguages'

export default {
	title: 'Size',
	name: 'size',
	type: 'document',
	icon: FaTag,
	fields: [
		{
			name: 'title',
			type: 'localeString',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare ({title}) {
			return {
				title: title ? title[defaultLanguage.id] : null,
			}
		},
	},
}
