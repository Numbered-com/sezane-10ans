import {MdBookmark, MdFormatAlignLeft} from 'react-icons/md'
import find from 'lodash/find'
import {internalLink} from './link'

export default {
	title: 'Rich Text',
	name: 'rich_text',
	type: 'object',
	fields: [{
		title: 'Text',
		name: 'text',
		type: 'array',
		of: [{
			type: 'block',
			marks: {
				annotations: [
					{
						name: 'link',
						title: 'External Link',
						type: 'object',
						fields: [{
							name: 'href',
							title: 'Link',
							type: 'url',
							validation: Rule => Rule.required().uri({
								scheme: ['http', 'https', 'tel', 'mailto'],
							}),
						},
						{
							name: 'open_in_new_window',
							title: 'Open in new Window',
							type: 'boolean',
						}],
					},
					{
						type: 'reference',
						name: 'internal_link',
						title: 'Internal Link',
						to: [...find(internalLink.fields, {name: 'reference'}).to],
						validation: Rule => Rule.required(),
						blockEditor: {
							icon: MdBookmark,
						},
					},
				],
			},
		}, {
			type: 'object',
			title: 'Tiles',
			name: 'tiles',
			fields: [{
				type: 'array',
				title: 'Tiles',
				name: 'tiles',
				of: [{
					type: 'object',
					title: 'Tiles',
					name: 'tiles',
					fields: [{
						type: 'string',
						name: 'title',
						title: 'Title',
					}, {
						type: 'text',
						name: 'copy',
						title: 'Copy',
					}],
				}],
			}],
			preview: {
				prepare ({text}) {
					return {
						title: 'Tiles',
					}
				},
			},
		}],
	}],
	preview: {
		select: {
			text: 'text',
		},
		prepare ({text}) {
			const block = (text || []).find(block => block._type === 'block')
			return {
				title: block
					? block.children
						.filter(child => child._type === 'span')
						.map(span => span.text)
						.join('')
					: 'No title',
				media: MdFormatAlignLeft,
			}
		},
	},
}
