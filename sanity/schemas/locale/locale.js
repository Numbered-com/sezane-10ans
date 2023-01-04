import supportedLanguages from './supportedLanguages'

export default {
	title: 'Locale',
	name: 'locale',
	type: 'document',
	// liveEdit: true,
	fieldsets: [
		{
			name: 'translations',
			options: {collapsed: false, collapsible: false},
		},
	],
	fields: [
		{
			title: 'Key',
			name: 'title',
			type: 'string',
		},
		...supportedLanguages.map(lang => ({
			title: lang.title,
			name: lang.id,
			type: 'string',
			fieldset: 'translations',
		})),
	],
	// orderings: [
	// 	{
	// 		title: 'Title descending',
	// 		name: 'titleDesc',
	// 		by: [
	// 			{field: defaultLanguage.id, direction: 'desc'}
	// 		]
	// 	},
	// 	{
	// 		title: 'Title ascending',
	// 		name: 'titleAsc',
	// 		by: [
	// 			{field: defaultLanguage.id, direction: 'asc'}
	// 		]
	// 	}
	// ]
	// preview: {
	// 	select: {title: 'title', ...supportedLanguages.map(lang => lang.id)},
	// 	prepare (select) {
	// 		const entries = Object.entries(select).map(e => e[1]).filter(e => e !== undefined)
	// 		entries.shift()

	// 		return {
	// 			title: select.title,
	// 			subtitle: null,
	// 			media: TiPencil,
	// 			description: entries.join(' / ')
	// 		}
	// 	}
	// }
}
