import supportedLanguages from '../schemas/locale/supportedLanguages'

export default {
	supportedLanguages,
	defaultLanguages: supportedLanguages/* .filter(({isDefault}) => (isDefault === true)) */.map(({id}) => id),
	filterField: (enclosingType, field, selectedLanguageIds) => !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
