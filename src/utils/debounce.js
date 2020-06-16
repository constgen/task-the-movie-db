export default function debounce (func, delay = 0) {
	let timerId

	return function (...args) {
		clearTimeout(timerId)
		timerId = setTimeout(function () {
			func(...args)
		}, delay)
	}
}