import localStorage from './storage/local-storage.service.js'

const KEY = 'favorites'

export default {
	getAll () {
		return localStorage.get(KEY) || []
	},
	add (id) {
		let favorites = this.getAll()

		favorites.push(id)
		localStorage.set(KEY, favorites)
		return id
	},
	remove (id) {
		let favorites = this.getAll()
		let index = favorites.indexOf(id)

		if (index >= 0) {
			favorites.splice(index, 1)
		}
		localStorage.set(KEY, favorites)
		return id
	},
	isFavorite (id) {
		let favorites = this.getAll()

		return favorites.includes(id)
	}
}