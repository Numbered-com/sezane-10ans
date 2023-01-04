export default {
	name: 'cookies',
	title: 'Cookies banner',
	type: 'object',
	fields: [
		{
			type: 'localeText',
			name: 'copy',
			title: 'Copy',
		},
		{
			type: 'internalLinkWithLabel',
			name: 'link',
			title: 'Terms and conditions Link',
		},
	],
	preview: {
		prepare () {
			return {
				title: 'Cookies',
			}
		},
	},
}
