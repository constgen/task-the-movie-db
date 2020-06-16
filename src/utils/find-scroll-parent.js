function getParentElems (node, parents = []) {
	let parent = node.parentNode
	let noMoreParents = !node.parentNode || node.parentNode === document

	if (noMoreParents) {
		return parents
	}
	return getParentElems(parent, parents.concat([parent]))
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
	const SCROLLABLE_VALUE_EXPR = /(\bauto\b|\bscroll\b)/

	return SCROLLABLE_VALUE_EXPR.test(getOverflowStyle(node))
}

export default function findScrollParent (node) {
	let parents = getParentElems(node)
	let scrollableParent = parents.find(isScrollable)

	return scrollableParent	|| document.documentElement
}