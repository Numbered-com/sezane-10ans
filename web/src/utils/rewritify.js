/* === AUTO GENERATED FILE === */
/* eslint-disable */
const rewrites = []

export default function rewritify (route = '') {
	const page = rewrites.find(rewrite => route.startsWith(rewrite.destination))

	return page
		? route.replace(page.destination, page.source)
		: route
}
