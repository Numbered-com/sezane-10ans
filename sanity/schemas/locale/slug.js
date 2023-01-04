import supportedLanguages from './supportedLanguages'

export default {
	name: 'localeSlug',
	title: 'Locale slug',
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
		type: 'slug',
		fieldset: lang.isDefault ? null : 'translations',
		options: {
			source: document => document.title[lang.id] || document.title,
			maxLength: 96,
		},
		validation: Rule => lang.isDefault ? Rule.required() : Rule,
	})),
}
