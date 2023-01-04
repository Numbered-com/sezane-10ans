import {MdDescription, MdLaunch} from 'react-icons/md'

const externalLinkWithLabel = {
	name: 'externalLinkWithLabel',
	title: 'External Link',
	type: 'object',
	fields: [
		{
			type: 'url',
			name: 'url',
			title: 'URL',
			validation: Rule => Rule.required().uri({
				scheme: ['http', 'https', 'tel', 'mailto'],
			}),
		},
		{
			type: 'localeString',
			name: 'label',
			title: 'Label',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'url',
		},
		prepare: selection => ({
			...selection,
			media: MdLaunch,
		}),
	},
}

const externalLink = {
	...externalLinkWithLabel,
	name: 'externalLink',
	fields: [externalLinkWithLabel.fields[0]],
}

const internalLinkWithLabel = {
	name: 'internalLinkWithLabel',
	title: 'Internal Link',
	type: 'object',
	fields: [
		{
			title: 'Document',
			name: 'reference',
			type: 'reference',
			to: [
				{type: 'page'},
				{type: 'pageHome'},
			],
			options: {filter: 'defined(slug)'},
			validation: Rule => Rule.required(),
		},
		{
			title: 'Label',
			name: 'label',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'label',
			referenceSlug: 'reference.slug',
		},
		prepare: ({title, referenceSlug}) => {
			return {
				title: title,
				subtitle: referenceSlug.current,
				media: MdDescription,
			}
		},
	},
}

export const internalLink = {
	...internalLinkWithLabel,
	name: 'internalLink',
	fields: [internalLinkWithLabel.fields[0]],
}

const link = [
	externalLink,
	externalLinkWithLabel,
	internalLink,
	internalLinkWithLabel,
	{
		name: 'link',
		title: 'Link',
		type: 'array',
		options: {
			sortable: false,
		},
		of: [
			{type: 'externalLink'},
			{type: 'internalLink'},
		],
		validation: Rule => Rule.max(1),
	},
]

export default link
