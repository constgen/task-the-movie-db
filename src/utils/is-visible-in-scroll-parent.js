function getPositionInScrollParent (elem, parent) {
	return {
		left: elem.offsetLeft - parent.offsetLeft - parent.scrollLeft,
		top: elem.offsetTop - parent.offsetTop - parent.scrollTop
	}
}


export default function isVisibleInScrollParent (elem, scrollParent) {
	let position = getPositionInScrollParent(elem, scrollParent)

	let parentHeight = scrollParent.offsetHeight
	let parentWidth = scrollParent.offsetWidth
	let elemHeight = elem.offsetHeight
	let elemWidth = elem.offsetWidth

	let verticalyVisible = (position.top + elemHeight > 0) && (position.top < parentHeight)
	let horizontalyVisible = (position.left + elemWidth > 0) && (position.left < parentWidth)
	let visble = verticalyVisible && horizontalyVisible

	return visble
}