const REQUIRED_PROPS = [
	'image',
	'quote',
]

export default {
	title: 'Diptych With Image',
	name: 'diptychWithImage',
	type: 'object',
	description: 'Remove the reference to a talent to fill the diptych fields by fields.',
	fields: [
		{
			title: 'Talent',
			name: 'employee',
			type: 'reference',
			description: 'Only talents with an image and a quote are available.',
			to: [{type: 'employee'}],
			options: {filter: `_type == 'employee' && defined(image) && defined(quote)`},
		},

		{
			title: 'Image',
			name: 'image',
			type: 'image',
			hidden: ({parent}) => !!parent?.employee,
			options: {hotspot: true, accept: '.jpg, .jpeg'},
		},
		{
			title: 'Quote',
			name: 'quote',
			type: 'text',
			hidden: ({parent}) => !!parent?.employee,
		},
		{
			title: 'Signature',
			name: 'signature',
			type: 'image',
			hidden: ({parent}) => !!parent?.employee,
			options: {hotspot: false, accept: '.jpg, .jpeg'},
		},
		{
			title: 'Name',
			name: 'name',
			type: 'string',
			hidden: ({parent}) => !!parent?.employee,
		},
		{
			title: 'Caption',
			name: 'caption',
			type: 'text',
			hidden: ({parent}) => !!parent?.employee,
		},
	],
	validation: Rule => Rule.required().custom((diptych) => {
		if (typeof diptych === 'undefined') {
			return {
				message: 'A diptych should either contains a reference to a talent or either be filled fields by fields',
				paths: ['employee', 'test', 'test2', 'test2.test3', 'content', 'content.image', 'content.quote'],
			}
		}

		if (diptych?.employee) return true

		const emptyProps = REQUIRED_PROPS.filter(prop => !diptych[prop])
		if (emptyProps.length === 0) return true

		const fields = emptyProps
			.map((string, index, array) => {
				let suffix = ', '
				if (index === array.length - 2) {
					suffix = ' and '
				} else if (index === array.length - 1) {
					suffix = ''
				}
				return string + suffix
			})
			.join('')
		const message = emptyProps.length === 1
			? `Field ${fields} is required`
			: `Fields ${fields} are required`
		return {
			message,
			paths: emptyProps,
		}
	}),
}
