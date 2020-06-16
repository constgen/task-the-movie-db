import Storage from './Storage.js'

let { localStorage } = window
let storage = new Storage(localStorage)

function get (key) {
	return storage.get(key)
}

function getAll () {
	return storage.getAll()
}

function set (key, data) {
	return storage.set(key, data)
}

function setAll (values) {
	return storage.setAll(values)
}

function remove (key) {
	return storage.remove(key)
}

function clear () {
	return storage.clear()
}

export default {
	get, getAll, set, setAll, remove, clear
}