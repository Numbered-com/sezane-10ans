export default {
	title: 'Footer',
	name: 'footer',
	type: 'document',
	fields: [
		{
			title: 'Default next page',
			name: 'footerLinkDefault',
			type: 'internalLinkWithLabel',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Footer links',
			name: 'links',
			type: 'array',
			of: [{type: 'internalLinkWithLabel'}],
		},
		{
			title: 'Copyright label',
			name: 'copyright',
			type: 'string',
		},
		{
			title: 'Socials',
			name: 'socials',
			type: 'array',
			of: [{type: 'socialLink'}],
		},
	],
	preview: {
		prepare: () => ({title: 'Footer'}),
	},
}
