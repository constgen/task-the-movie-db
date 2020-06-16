export default function getOffsetInParent (elem, parent) {
	let elemRect = elem.getBoundingClientRect()
	let parentRect = parent.getBoundingClientRect()

	return {
		bottom: elemRect.bottom - parentRect.top + parent.scrollTop,
		left: elemRect.left - parentRect.left + parent.scrollLeft,
		right: elemRect.right - parentRect.left + parent.scrollLeft,
		top: elemRect.top - parentRect.top + parent.scrollTop,
		height: elemRect.height,
		width: elemRect.width
	}
}