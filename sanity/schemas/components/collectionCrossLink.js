export default {
	name: 'collectionCrossLink',
	title: 'Collection cross link',
	type: 'object',
	fields: [
		{
			title: 'Image',
			name: 'image',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			media: 'image',
			collection: 'collection.title',
		},
		prepare ({collection, media}) {
			return {
				title: 'Collection push',
				subtitle: collection,
				media: media,
			}
		},
	},
}
