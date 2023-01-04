import supportedLanguages from './supportedLanguages'

export default {
	title: 'Locale text',
	name: 'localeText',
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
		type: 'text',
		rows: 3,
		fieldset: lang.isDefault ? null : 'translations',
	})),
}
