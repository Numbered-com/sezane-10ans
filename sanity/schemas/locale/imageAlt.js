import {defaultLanguage} from '../locale/supportedLanguages'
import {MdImage} from 'react-icons/md'

export default {
	title: 'Image',
	name: 'imageLocaleAlt',
	type: 'image',
	icon: MdImage,
	options: {
		//   metadata: ['palette', 'lqip'],
		hotspot: true,
		accept: '.jpg, .jpeg, .png',
	},
	fields: [
		{
			name: 'alt',
			type: 'localeString',
			title: 'Alt',
			options: {
				isHighlighted: true,
				collapsible: true,
			},
		},
	],
	preview: {
		select: {
			// title: 'asset.originalFilename',
			media: 'asset',
			subtitle: 'alt',
		},
		prepare ({title, media, subtitle}) {
			return {
				title: title,
				subtitle: subtitle ? subtitle[defaultLanguage.id] : null,
				media: media,
			}
		},
	},
}
