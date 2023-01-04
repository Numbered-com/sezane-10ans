import {MdDescription} from 'react-icons/md'

export default {
	name: 'page',
	title: 'Page',
	type: 'document',
	icon: MdDescription,
	fields: [
		{
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'slug',
			type: 'slug',
			validation: Rule => Rule.required(),
			options: {source: 'title'},
		},
		{
			name: 'content',
			type: 'blockContent',
			validation: Rule => Rule.required(),
		},
	],
}
