import movies from '../services/movies.service.js'
import favorites from '../services/favorites.service.js'
import { on, insertHtmlTo, appendHtmlTo, preventEvent } from '../utils/dom.js'
import { map, reduce } from '../utils/fp.js'
import { sum } from '../utils/math.js'
import noop from '../utils/noop.js'
import movieItemHtml from '../templates/movie-item-html.template.js'
import findScrollParent from '../utils/find-scroll-parent.js'
import isVisibleInScrollParent from '../utils/is-visible-in-scroll-parent.js'
import Movie from '../models/movie.model.js'
import debounce from '../utils/debounce.js'

const INPUT_DELAY = 400
let searchBoxForm = document.querySelector('.movies .search-box')
let searchInputField = searchBoxForm.querySelector('input')
let moviesListElem = document.querySelector('.movies .movies-list')
let errorMessageElem = document.querySelector('.movies .search-error')
let infinteLoaderElem = document.querySelector('.movies .infinite-loader')
let filterSelectElem = document.querySelector('.movies .search-tools .select-filter')
let orderSelectElem = document.querySelector('.movies .search-tools .select-order')
let moviesTitleElem = document.querySelector('.movies .movies-title')
let countersTextElem = document.querySelector('.movies .counters-text')
let infinteScrollElem = findScrollParent(infinteLoaderElem)
let insertToList = insertHtmlTo(moviesListElem)
let appendToList = appendHtmlTo(moviesListElem)
let insertToErrors = insertHtmlTo(errorMessageElem)
let insertToCountersText = insertHtmlTo(countersTextElem)
let concatHtml = reduce(sum, '')
let state = {
	searchText: '',
	page: 1,
	byIds: [],
	sort_by: undefined,
	pending: undefined
}

function showSearchError (err) {
	insertToList('')
	insertToErrors(err.message)
	return err.message
}

function clearErrors (data) {
	insertToErrors('')
	return data
}

function toMovie (data) {
	let { id } = data
	let favorite = favorites.isFavorite(id)

	return new Movie({ ...data, favorite })
}

function getMoviesItems (data) {
	if (data.success === false) {
		throw new Error(data.status_message)
	}
	return data.results
}

function getMoviesCounters (data) {
	if (data.success === false) {
		throw new Error(data.status_message)
	}
	return {
		count: data.results.length * data.page,
		total: data.total_results
	}
}

function requestMovies () {
	let whenMoviesReady

	searchInputField.disabled = false
	filterSelectElem.disabled = false
	orderSelectElem.disabled = false
	insertHtmlTo(moviesTitleElem, filterSelectElem.selectedOptions[0].textContent)

	if (state.searchText) {
		whenMoviesReady = movies.search(state.searchText)
		filterSelectElem.disabled = true
		orderSelectElem.disabled = true
		insertHtmlTo(moviesTitleElem, `Search results for '${state.searchText}'`)
	}
	else if (state.byIds.length) {
		whenMoviesReady = movies.getById(...state.byIds)
		orderSelectElem.disabled = true
	}
	else {
		whenMoviesReady = movies.get({ sort_by: state.sort_by })
	}

	whenMoviesReady
		.then(getMoviesCounters)
		.then(function ({ count, total }) {
			return `Showing ${count} of a total of ${total} movies`
		})
		.then(insertToCountersText)
		.catch(noop)

	whenMoviesReady
		.then(getMoviesItems)
		.then(map(toMovie))
		.then(map(movieItemHtml))
		.then(concatHtml)
		.then(insertToList)
		.then(clearErrors)
		.catch(showSearchError)
}

function requestNextMovies () {
	state.page += 1
	let whenMoviesReady

	if (state.searchText) {
		whenMoviesReady = movies.search(state.searchText, state.page)
	}
	else if (state.byIds.length) {
		whenMoviesReady = new Promise(noop)
	}
	else {
		whenMoviesReady = movies.get({ sort_by: state.sort_by }, state.page)
	}

	whenMoviesReady
		.then(getMoviesCounters)
		.then(function ({ count, total }) {
			return `Showing ${count} of a total of ${total} movies`
		})
		.then(insertToCountersText)
		.catch(noop)

	whenMoviesReady
		.then(getMoviesItems)
		.then(map(toMovie))
		.then(map(movieItemHtml))
		.then(concatHtml)
		.then(appendToList)
		.catch(showSearchError)
}

function handleSearch () {
	state.page = 1
	state.searchText = searchInputField.value
	requestMovies()
}

function handlePagination (data) {
	let visible = isVisibleInScrollParent(infinteLoaderElem, infinteScrollElem)
	let visibilityChanged = visible !== state.pending
	let becameVisible = visibilityChanged && visible

	state.pending = visible
	if (becameVisible) {
		requestNextMovies()
	}
	return data
}

function handleFavoriteChange (event) {
	let { value, checked } = event.target
	let id = JSON.parse(value)

	if (checked) {
		favorites.add(id)
	}
	else {
		favorites.remove(id)
	}
}

function handleFilterChange (event) {
	let { value } = event.target

	state.byIds = []
	if (value === 'favorites') {
		state.byIds = favorites.getAll()
	}
	requestMovies()
}

function handleOrderChange (event) {
	let { value } = event.target

	state.page = 1
	state.sort_by = value || undefined
	requestMovies()
}

on('submit', searchBoxForm, preventEvent)
on('submit', searchBoxForm, handleSearch)
on('input', searchInputField, debounce(handleSearch, INPUT_DELAY))
on('scroll', infinteScrollElem, handlePagination)
on('change', moviesListElem, handleFavoriteChange)
on('change', filterSelectElem, handleFilterChange)
on('change', orderSelectElem, handleOrderChange)

requestMovies()