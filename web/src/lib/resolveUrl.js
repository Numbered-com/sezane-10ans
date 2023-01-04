export const resolveUrl = (type, slug) => {
	const t = type.indexOf('page') !== -1 ? 'page' : type

	switch (t) {
		case 'fund': return `/funds/${slug}`
		case 'company': return `/companies/${slug}`
		case 'employee': return `/team/${slug}`
		case 'article': return `/blog/${slug}`
		case 'page': return `/${slug}`
		default: return `/${type}/${slug}`
	}
}
