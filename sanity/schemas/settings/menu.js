export default {
	title: 'Menu',
	name: 'menu',
	type: 'document',
	fields: [
		{
			title: 'Menu primary links',
			name: 'linksPrimary',
			type: 'array',
			of: [{type: 'internalLinkWithLabel'}],
		},
		{
			title: 'Menu secondary links',
			name: 'linksSecondary',
			type: 'array',
			of: [{type: 'internalLinkWithLabel'}],
		},
	],
	preview: {
		prepare: () => ({title: 'Menu'}),
	},
}
