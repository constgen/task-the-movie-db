import getOffsetInParent from './get-offset-in-parent.js'

function getPositionInScrollParent (elem, parent) {
	let offset = getOffsetInParent(elem, parent)

	return {
		left: offset.left - parent.scrollLeft,
		top: offset.top - parent.scrollTop
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