module.exports = (plop) => {
	plop.setHelper('eq', (a, b, opts) => {
		if (a === b) {
			return opts.fn(this)
		} else {
			return opts.inverse(this)
		}
	})

	plop.setGenerator('module', {
		description: 'Create a new module',

		prompts: [
			{
				type: 'list',
				name: 'type',
				message: 'What is your module type?',
				choices: ['component', 'slice', 'page'],
			},
			{
				type: 'input',
				name: 'name',
				message: 'What is your module name?',
			},
		],

		actions: [
			{
				type: 'add',
				path: 'src/{{type}}s/{{camelCase name}}/{{pascalCase name}}.js',
				templateFile: 'plop-templates/{{type}}.js',
			},
			{
				type: 'add',
				path: 'src/{{type}}s/{{camelCase name}}/{{camelCase name}}.module.scss',
				templateFile: 'plop-templates/module.scss',
			},
			{
				type: 'modify',
				path: 'src/slices/slices.js',
				pattern: /(const components = {)/gi,
				template: '$1\r\n\t{{camelCase name}}: {{pascalCase name}},',
				skip: (data) => {
					if (data.type !== 'slice') return 'Skip registration'
				},
			},
			{
				type: 'modify',
				path: 'src/slices/slices.js',
				pattern: /(\r\nconst components = {)/gi,
				template: "import {{pascalCase name}} from './{{camelCase name}}/{{pascalCase name}}'\r\n$1",
				skip: (data) => {
					if (data.type !== 'slice') return 'Skip registration'
				},
			},
		],
	})
}
