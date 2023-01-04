import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
	// static async getInitialProps (ctx) {
	// 	const initialProps = await Document.getInitialProps(ctx)
	// 	return {...initialProps}
	// }

	render () {
		return (
			process.env.NEXT_PUBLIC_BUILD ? (
				<Html>
					<Head />
					<body>
						<Main />
						<NextScript />
					</body>
				</Html>
			) : (
				<Html>
					<Head />
					<body>
						<Main />
						<NextScript />
					</body>
				</Html>
			)
		)
	}
}

export default MyDocument
