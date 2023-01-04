import supportedLanguages from './supportedLanguages'

export default {
	name: 'localeString',
	title: 'Locale string',
	type: 'object',
	fieldsets: [
		{
			title: 'Translations',
			name: 'translations',
			options: {collapsible: false, columns: supportedLanguages.length - 1},
		},
	],
	fields: supportedLanguages.map(lang => ({
		title: lang.title,
		name: lang.id,
		type: 'string',
		fieldset: lang.isDefault ? null : 'translations',
	})),
}
