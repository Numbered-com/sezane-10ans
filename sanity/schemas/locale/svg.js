import supportedLanguages from './supportedLanguages'

export default {
	name: 'localeSvg',
	title: 'Locale svg',
	type: 'object',
	fieldsets: [
		{
			title: 'Translations',
			name: 'translations',
			options: {collapsible: true},
		},
	],
	fields: supportedLanguages.map(lang => ({
		title: lang.title,
		name: lang.id,
		type: 'image',
		options: {
			accept: 'image/svg+xml',
		},
		fieldset: lang.isDefault ? null : 'translations',
	})),
}
