export default function formatUrlQuery (query) {
	let searchQuery = ''

	if (typeof query === 'object') {
		searchQuery = (function () {
			let params = Object.keys(query)
			let i = -1
			let param
			let search = []

			while (++i in params) {
				param = params[i]
				if (query[param] === undefined) continue
				search.push(`${param}=${query[param]}`)
			}
			return search.length ? (`?${encodeURI(search.join('&'))}`) : ''
		}())
	}

	return searchQuery
}