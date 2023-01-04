import {MdError} from 'react-icons/md'

export default {
	title: 'Error',
	name: 'pageError',
	type: 'document',
	icon: MdError,
	hidden: true,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		prepare ({title}) {
			return {
				title: '404',
			}
		},
	},
}
