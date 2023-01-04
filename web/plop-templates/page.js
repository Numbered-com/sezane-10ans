import styles from './{{camelCase name}}.module.scss'

import {getPageById} from 'lib/api'

const {{pascalCase name}} = ({title}) =>
	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

export async function getStaticProps ({params, preview, previewData}) {
	const props = await getPageById('{{camelCase name}}', preview)

	return {
		props
	}
}

export default {{pascalCase name}}
