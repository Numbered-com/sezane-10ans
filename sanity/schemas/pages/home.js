import {MdHome} from 'react-icons/md'

export default {
	title: 'Home',
	name: 'pageHome',
	type: 'document',
	icon: MdHome,
	fields: [
		{
			name: 'title',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'subtitleIntro',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'subtitleList',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'subtitleOutro',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'introDescription',
			type: 'localeText',
		},
		{
			name: 'introOptin',
			type: 'localeText',
		},
		{
			name: 'introLegals',
			type: 'localeBlockContentParagraph',
		},
		{
			name: 'description',
			title: 'Grid description',
			type: 'localeText',
		},
		{
			name: 'outroImage',
			title: 'Cloudinary outro image',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		// {
		// 	name: 'outroSubtitle',
		// 	type: 'localeText',
		// },
		{
			name: 'outroHelp',
			type: 'localeText',
		},
		{
			name: 'thanksImage',
			title: 'Cloudinary thanks image',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksMessage',
			type: 'localeText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksCtaLabel',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thanksCtaUrl',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		prepare: () => ({title: 'Home'}),
	},
}
