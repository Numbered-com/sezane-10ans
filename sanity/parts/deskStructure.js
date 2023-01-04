import S from '@sanity/desk-tool/structure-builder'
import {MdSettings, MdDescription, MdHome, MdFolder} from 'react-icons/md'
import {FiShoppingCart} from 'react-icons/fi'
import {FaPen, FaTags} from 'react-icons/fa'
import {GiEarthAmerica} from 'react-icons/gi'

export default () =>
	S.list()
		.id('__root__')
		.title('Content')
		.items([
			S.listItem()
				.title('Pages')
				.icon(MdDescription)
				.child(
					S.list()
						.title('Pages')
						.id('pages')
						.items([
							// S.listItem()
							// 	.title('Created pages')
							// 	.icon(MdFolder)
							// 	.child(
							// 		S.documentList()
							// 			.title('Created pages')
							// 			.filter('_type == "page" && _id != "home"'),
							// 	),
							// S.divider(),
							S.listItem()
								.title('Home')
								.icon(MdHome)
								.child(
									S.editor()
										.schemaType('pageHome')
										.id('page-home')
										.documentId('page-home'),
								),
							// S.divider(),
							// S.listItem()
							// 	.title('404')
							// 	.icon(FaRegSadCry)
							// 	.child(
							// 		S.editor()
							// 			.schemaType('pageError')
							// 			.id('error-page-404')
							// 			.documentId('error-page-404'),
							// 	),
						]),
				),

			S.divider(),

			S.listItem()
				.title('Products')
				.icon(FiShoppingCart)
				.child(
					S.documentTypeList('product')
						.title('Products'),
				),
			S.listItem()
				.title('Product Sizes')
				.icon(FaTags)
				.child(
					S.documentTypeList('size')
						.title('Product Sizes'),
				),

			S.divider(),

			S.listItem()
				.title('Localisation')
				.icon(GiEarthAmerica)
				.child(
					S.list()
						.title('Localisation')
						.id('localisation')
						.items([
							S.listItem()
								.title('String translations')
								.icon(MdFolder)
								.child(
									S.documentTypeList('locale')
										.title('Localisation'),
									// .menuItems([
									// 	S.orderingMenuItem({title: 'Title ascending', by: [{field: defaultLanguage.id, direction: 'asc'}]}),
									// 	S.orderingMenuItem({title: 'Title descending', by: [{field: defaultLanguage.id, direction: 'desc'}]})
									// ])
								),
						]),
				),

			S.divider(),

			S.listItem()
				.title('Site Settings')
				.icon(MdSettings)
				.child(
					S.list()
						.title('Site Settings')
						.id('site-settings')
						.items([
							// S.listItem()
							// 	.title('Menu')
							// 	.icon(TiThMenu)
							// 	.child(
							// 		S.editor()
							// 			.schemaType('menu')
							// 			.id('menu')
							// 			.documentId('settings.menu'),
							// 	),
							// S.listItem()
							// 	.title('Footer')
							// 	.icon(TiThMenu)
							// 	.child(
							// 		S.editor()
							// 			.schemaType('footer')
							// 			.id('footer')
							// 			.documentId('settings.footer'),
							// 	),
							S.listItem()
								.title('Metadata')
								.icon(FaPen)
								.child(
									S.editor()
										.id('settings')
										.schemaType('settings')
										.documentId('settings.general'),
								),
							// S.listItem()
							// 	.title('Cookies')
							// 	.icon(GiCookie)
							// 	.child(
							// 		S.editor()
							// 			.id('cookies')
							// 			.schemaType('cookies')
							// 			.documentId('settings.cookies'),
							// 	),
						]),
				),
		])
