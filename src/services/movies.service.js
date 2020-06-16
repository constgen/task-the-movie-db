import http from './http.service.js'

const API_KEY = '8b9aa111dc0f99f73fb800ed28326c4f'
const API_URL = 'https://api.themoviedb.org/3'

function getItems ({ body }) {
	if (body.success === false) {
		throw new Error(body.status_message)
	}
	return body.results
}

export default {
	search (text = '', page = 1) {
		return http.get(`${API_URL}/search/movie`, {
			api_key: API_KEY,
			query: text,
			page
		}).then(getItems)
	},
	get (filter = {}, page = 1) {
		return http.get(`${API_URL}/discover/movie`, {
			'api_key': API_KEY,
			'vote_count.gte': 10,
			page,
			...filter
		}).then(getItems)
	},
	getById (...ids) {
		return Promise.all(ids.map(function (id) {
			return http.get(`${API_URL}/movie/${id}`, {
				api_key: API_KEY
			}).then(({ body }) => body)
		}))
	}
}