export const slugify = (str, separator = '-') => {
	str = str
		.toString()
		.normalize('NFD') // split an accented letter in the base letter and the accent
		.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/^[0-9]+ ?/, '')
		.replace(/\s+/g, separator)
	return str
}
