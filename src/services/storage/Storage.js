export default class Storage {
	constructor (webStorage) {
		this.storage = webStorage
	}

	/**
	 * Get an item by a key.
	 * @param {string} key - Key name.
	 * @returns {*} - Persisted data.
	 */
	get (key) {
		let value = this.storage.getItem(key)

		return JSON.parse(value)
	}

	/**
	 * Get all persisted data as an object.
	 * @returns {*} - Persisted data.
	 */
	getAll () {
		let data = Object.assign({}, this.storage)

		Object.keys(data).forEach(function (key) {
			data[key] = JSON.parse(data[key])
		})
		return data
	}

	/**
	 * Set a persistent item by a key.
	 * @param {string} key - Data key.
	 * @param {*} data - Data to be persisted.
	 * @returns {*} - Persisted data.
	 */
	set (key, data) {
		let value = JSON.stringify(data)

		this.storage.setItem(key, value)
		return data
	}

	/**
	 * Set persistent items as an object with key-value pares.
	 * @param {object} values - Data key.
	 * @returns {object} - Persisted data.
	 */
	setAll (values) {
		let storage = this.storage

		Object.entries(values).forEach(function ([key, data]) {
			let value = JSON.stringify(data)

			storage.setItem(key, value)
		})
		return values
	}

	/**
	 * Delete a persisted item by a key.
	 * @param {string} key - Key name.
	 */
	remove (key) {
		this.storage.removeItem(key)
	}

	/**
	 * Delete all persisted data.
	 */
	clear () {
		this.storage.clear()
	}
}