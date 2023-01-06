const supportedLanguages = [
	{id: 'en_us', title: 'English US', isDefault: true},
	{id: 'en_uk', title: 'English UK'},
	{id: 'fr_fr', title: 'French'},
]

export const defaultLanguage = supportedLanguages.find(value => value.isDefault === true)

export default supportedLanguages
