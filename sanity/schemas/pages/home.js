import {MdHome} from 'react-icons/md'

export default {
	title: 'Home',
	name: 'pageHome',
	type: 'document',
	icon: MdHome,
	fields: [
		{
			name: 'title',
			type: 'localeText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'subtitleIntro',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'heroImage',
			title: 'Cloudinary intro image',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'formSurtitle',
			type: 'localeString',
		},
		{
			name: 'formTitle',
			type: 'localeText',
		},
		{
			name: 'formDescription',
			type: 'localeText',
		},
		{
			name: 'formOptin1',
			type: 'localeBlockContent',
		},
		{
			name: 'formOptin2',
			type: 'localeBlockContent',
		},
		{
			name: 'formImage',
			title: 'Cloudinary form image',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksTitle',
			title: 'Thanks title',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksImage',
			title: 'Cloudinary thanks image',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksDescription',
			type: 'localeText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksOptin',
			type: 'localeBlockContent',
		},
		{
			name: 'thanksCtaLabel',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		prepare: () => ({title: 'Home'}),
	},
}
