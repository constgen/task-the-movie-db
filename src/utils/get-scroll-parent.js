function getParents (node, parents = []) {
	let parent = node.parentNode
	let noMoreParents = !node.parentNode || node.parentNode === document.documentElement

	if (noMoreParents) {
		return parents
	}
	return getParents(parent, parents.concat([parent]))
}

function getStyle (node, prop) {
	return getComputedStyle(node, null).getPropertyValue(prop)
}

function getOverflowStyle (node) {
	return [
		getStyle(node, 'overflow'),
		getStyle(node, 'overflow-y'),
		getStyle(node, 'overflow-x')
	].join('-')
}

function isScrollable (node) {
	let regex = /(\bauto\b|\bscroll\b)/

	return regex.test(getOverflowStyle(node))
}

export default function getScrollParent (node) {
	let parents = getParents(node)
	let scrollableParent = parents.find(isScrollable)


	return scrollableParent
		|| document.scrollingElement
		|| document.documentElement
}