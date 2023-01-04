const video = {
	name: 'video',
	title: 'Video sources',
	type: 'object',
	fields: [
		{
			type: 'url',
			name: 'url_hd',
			title: 'URL (hd)',
			validation: Rule => Rule.required().uri({
				scheme: ['http', 'https'],
			}),
		},
		{
			type: 'url',
			name: 'url_md',
			title: 'URL (md)',
			validation: Rule => Rule.uri({
				scheme: ['http', 'https'],
			}),
		},
		{
			type: 'url',
			name: 'url_sd',
			title: 'URL (sd)',
			validation: Rule => Rule.uri({
				scheme: ['http', 'https'],
			}),
		},
	],
}

export default video
