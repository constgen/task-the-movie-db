import { curry } from './fp.js'

export let on = curry(function on (eventType, element, handler) {
	element.addEventListener(eventType, handler, false)
	return handler
})

export let off = curry(function off (eventType, element, handler) {
	element.removeEventListener(eventType, handler, false)
	return handler
})

export let insertHtmlTo = curry(function insertHtmlTo (element, htmlString) {
	element.innerHTML = htmlString
	return htmlString
})

export let appendHtmlTo = curry(function appendHtmlTo (element, htmlString) {
	element.insertAdjacentHTML('beforeend', htmlString)
	return htmlString
})


export function preventEvent (event) {
	event.preventDefault()
	return event
}