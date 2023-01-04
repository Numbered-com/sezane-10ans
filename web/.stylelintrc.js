module.exports = {
	parser: 'babel-eslint',
	extends: [
		"stylelint-config-standard",
		"stylelint-config-standard-scss",
	],
	ignoreFiles: ["**/*.js"],
	rules: {
		'indentation': 'tab',
		'string-quotes': 'single',
		'length-zero-no-unit': null,
		'at-rule-no-unknown': null,
		'declaration-block-trailing-semicolon': 'always',
		'selector-pseudo-class-no-unknown': [true, {'ignorePseudoClasses': ['global']}],
		'no-descending-specificity': null,
		'selector-class-pattern': null,
		'comment-empty-line-before': null,
		'scss/double-slash-comment-empty-line-before': null,
		'scss/dollar-variable-empty-line-before': null,
		'scss/dollar-variable-pattern': null,
		'alpha-value-notation': 'number',
		'color-function-notation': null,
	}
}
