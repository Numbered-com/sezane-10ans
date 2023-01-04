import {MdSettings} from 'react-icons/md'

export default {
	name: 'settings',
	title: 'Site settings',
	type: 'document',
	icon: MdSettings,
	hidden: true,
	fields: [
		{
			title: 'Site title',
			name: 'title',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Meta description',
			name: 'description',
			type: 'localeText',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Meta image',
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'This is the image that will be used for display as the webpage brand for this entry, as well as on Twitter Cards and Facebook OpenGraph that link to this page. This will default to the page hero image',
		},
	],
	preview: {
		prepare: () => ({title: 'Site settings'}),
	},
}
