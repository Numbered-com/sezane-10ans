const supportedLanguages = [
	{id: 'en_us', title: 'English US', isDefault: true},
	{id: 'fr_fr', title: 'French'},
	{id: 'en_ca', title: 'Canada'},
	{id: 'en_au', title: 'Australia'},
	{id: 'en_uk', title: 'English UK'},
	{id: 'en_da', title: 'Denmark'},
	{id: 'en_eu', title: 'Europe'},
]

export const defaultLanguage = supportedLanguages.find(value => value.isDefault === true)

export default supportedLanguages
