module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		sourceType: 'module',
		babelOptions: {
			cwd: __dirname,
		},
	},
	extends: ['standard', 'standard-react', 'plugin:import/errors'],
	rules: {
		'react/prop-types': 0,
		'object-curly-spacing': ['error', 'never'],
		'no-tabs': 0,
		'react/react-in-jsx-scope': ['off'],
		'react/jsx-indent': ['error', 'tab', {checkAttributes: true, indentLogicalExpressions: true}],
		'react/jsx-indent-props': ['error', 'tab'],
		'import/no-unresolved': [2, {ignore: ['^(all|part):']}],
		indent: ['error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
			outerIIFEBody: 1,
			MemberExpression: 1,
			FunctionDeclaration: {parameters: 1, body: 1},
			FunctionExpression: {parameters: 1, body: 1},
			CallExpression: {arguments: 1},
			ArrayExpression: 1,
			ObjectExpression: 1,
			ImportDeclaration: 1,
			flatTernaryExpressions: false,
			ignoreComments: false,
			ignoredNodes: ['TemplateLiteral'],
		}],
		'template-curly-spacing': ['off'],
		'comma-dangle': ['error', 'always-multiline'],
		'react/jsx-closing-bracket-location': [1, {selfClosing: 'after-props', nonEmpty: 'after-props'}],
		quotes: [1, 'single', {allowTemplateLiterals: true}],
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
		'import/resolver': {
			node: {
				moduleDirectory: ['node_modules', './src'],
			},
		},
	},
}
