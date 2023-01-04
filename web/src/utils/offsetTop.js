const offsetTop = (node) => {
	let top = 0
	while (node) {
		top += node.offsetTop
		node = node.offsetParent
	}
	return top
}

export default offsetTop
