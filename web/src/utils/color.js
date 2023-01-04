
/**
 * Check if a hexadecimal color is light or dark.
 * @param {String} color
 * @returns Boolean
 */
export const isLightColor = color => computeLuma(color) >= 165

/**
 * Compute Luma of a hexadecimal color.
 * @param {String} color
 * @returns Number
 */
const computeLuma = color => {
	const rgb = hexToRGB(color)
	return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] // SMPTE C, Rec. 709 weightings
}

/**
 * Convert hexadecimal color string to RGB array of numbers.
 * @param {String} color
 * @returns Array<Number>
 */
const hexToRGB = color => {
	const _color = color.replace('#', '')
	const rgb = []
	for (let i = 0; i <= 2; i++) rgb[i] = parseInt(_color.substr(i * 2, 2), 16)
	return rgb
}
