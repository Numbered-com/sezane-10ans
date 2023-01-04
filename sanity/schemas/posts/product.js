import React from 'react'
import {MdInsertDriveFile} from 'react-icons/md'
import {defaultLanguage} from '../locale/supportedLanguages'

export default {
	name: 'product',
	type: 'document',
	icon: MdInsertDriveFile,
	fields: [
		{
			name: 'title',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'variant',
			type: 'localeString',
		},
		{
			name: 'price',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'shopUrl',
			type: 'localeString',
			validation: Rule => Rule.required(),
		},
		{
			name: 'sizes',
			type: 'array',
			of: [{
				type: 'reference',
				to: [{
					type: 'size'
				}]
			}],
			options: {
				sortable: true,
			},
		},
		{
			name: 'image',
			title: 'Cloudinary preview url',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'order',
			type: 'number',
			hidden: true,
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare ({title, media}) {
			return {
				title: title ? title[defaultLanguage.id] : null,
				media: <img src={media.split('/upload/').join('/upload/c_fill,w_120,h_120,g_north/')} />,
			}
		},
	},
}
