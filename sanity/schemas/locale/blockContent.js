import supportedLanguages from './supportedLanguages'

const blockContent = (type) => {
	return {
		name: 'locale' + type.charAt(0).toUpperCase() + type.slice(1),
		title: 'Locale block',
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
			type: type,
			fieldset: lang.isDefault ? null : 'translations',
		})),
	}
}

export default [
	blockContent('blockContent'),
	blockContent('blockContentParagraph'),
]
