const IMAGE_WIDTH = 154
const IMAGE_CDN_URL = 'https://image.tmdb.org/t/p'

export default class Movie {
	constructor (info) {
		this.adult = Boolean(info.adult)
		this.backdrop_path = String(info.backdrop_path)
		this.genre_ids = [].concat(info.genre_ids)
		this.id = parseInt(info.id, 10)
		this.original_language = String(info.original_language)
		this.original_title = String(info.original_title)
		this.overview = String(info.overview)
		this.popularity = parseFloat(info.popularity)
		this.poster_path = String(info.poster_path)
		this.release_date = String(info.release_date)
		this.title = String(info.title)
		this.video = Boolean(info.video)
		this.vote_average = parseFloat(info.vote_average)
		this.vote_count = parseInt(info.vote_count, 10)
	}

	get releaseYear () {
		return new Date(this.release_date).getFullYear()
	}

	get imageUrl () {
		return `${IMAGE_CDN_URL}/w${IMAGE_WIDTH}${this.poster_path}`
	}

	get score () {
		return this.vote_average
	}
}