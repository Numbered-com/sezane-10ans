import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// pages
import page from './pages/page'
import home from './pages/home'
// import error from './pages/error'

// posts
import product from './posts/product'

// taxonomies
// import category from './taxonomies/category'

// slices

// components
import blockContent from './components/blockContent'
import blockContentParagraph from './components/blockContentParagraph'
import link from './components/link'
import imageAlt from './components/imageAlt'
import socialLink from './components/socialLink'
import video from './components/video'
import locale from './locale/locale'
import localeString from './locale/string'
import localeText from './locale/text'
import localeBlockContent from './locale/blockContent'
import localeSlug from './locale/slug'
import localeSvg from './locale/svg'
import imageLocaleAlt from './locale/imageAlt'

// settings
import settings from './settings/settings'
import menu from './settings/menu'
import footer from './settings/footer'
import size from './taxonomies/size'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		// components
		...link,
		blockContent,
		blockContentParagraph,
		imageAlt,
		socialLink,
		video,
		locale,
		localeText,
		...localeBlockContent,
		localeString,
		imageLocaleAlt,
		localeSlug,
		localeSvg,

		// slices
		// hero,
		// fullWidthImage,
		// productPushes,
		// banner,
		// diptych,
		// gallery,
		// diptychWithImage,
		// triptychWithImage,
		// pageSlices,

		// pages
		page,
		home,
		// error,

		// posts
		product,

		// taxo
		size,

		// settings
		settings,
		menu,
		footer,
		// cookies,
	]),
})
