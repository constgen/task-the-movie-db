import formatUrlQuery from '../utils/format-url-query.js'

// eslint-disable-next-line const-case/uppercase
export const STATUS = Object.freeze({
	OK: 200,
	REDIRECT: 300,
	UNMODIFIED: 304,
	LOCAL: 0
})

export function request ({ method = 'GET', url, params = {}, body = null }) {
	let xhr = new XMLHttpRequest()
	let requestUrl = url + formatUrlQuery(params)

	xhr.open(method, requestUrl, true)
	xhr.responseType = 'text'

	return new Promise(function (resolve, reject) {
		xhr.onreadystatechange = function () {
			if (this.readyState !== this.DONE) return

			if (
				(this.status >= STATUS.OK && this.status < STATUS.REDIRECT)
				|| (this.status === STATUS.LOCAL && this.responseText) // local
			) {
				resolve({ body: this.responseText })
			}
			else if (this.status === STATUS.UNMODIFIED) {
				resolve({ body: undefined })
			}
			else {
				reject(new Error(this.statusText))
			}
			this.onreadystatechange = null
			xhr = undefined
		}

		try {
			xhr.send(body)
		}
		catch (err) { // crossdomain
			reject(err)
		}
	}).then(function (response) {
		response.body = response.body ? JSON.parse(response.body) : undefined
		return response
	})
}

export default {
	get (url, params) {
		return request({ method: 'GET', url, params })
	},

	post () {

	}
}