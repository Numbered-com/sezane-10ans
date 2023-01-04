import {MdImage} from 'react-icons/md'

export default {
	title: 'Image',
	name: 'imageAlt',
	type: 'image',
	icon: MdImage,
	options: {
		//   metadata: ['palette', 'lqip'],
		hotspot: true,
		accept: '.jpg, .jpeg',
	},
	fields: [
		{
			name: 'alt',
			type: 'string',
			title: 'Alt',
			options: {
				isHighlighted: true,
				collapsible: true,
			},
		},
	],
	preview: {
		select: {
			media: 'asset',
			title: 'asset.originalFilename',
			subtitle: 'alt',
		},
		prepare ({title, media, subtitle}) {
			return {
				title: title || null,
				subtitle: subtitle || null,
				media: media,
			}
		},
	},
}
