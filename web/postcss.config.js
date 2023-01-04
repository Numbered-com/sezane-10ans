module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		'postcss-mq-optimize',
		'postcss-combine-media-query',
		'postcss-sort-media-queries',
	],
}
