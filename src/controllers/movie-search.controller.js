import movies from '../services/movies.service.js'
import { on, insertHtmlTo, appendHtmlTo, preventEvent } from '../utils/dom.js'
import { map, reduce } from '../utils/fp.js'
import { sum } from '../utils/math.js'
import movieItemHtml from '../templates/movie-item-html.template.js'
import getScrollParent from '../utils/get-scroll-parent.js'
import isVisibleInScrollParent from '../utils/is-visible-in-scroll-parent.js'
import Movie from '../models/movie.model.js'

let searchBoxForm = document.querySelector('.movies .search-box')
let searchInputField = searchBoxForm.querySelector('input')
let moviesListElem = document.querySelector('.movies .movies-list')
let errorMessageElem = document.querySelector('.movies .search-error')
let infinteLoaderElem = document.querySelector('.movies .infinite-loader')
let infinteScrollElem = getScrollParent(infinteLoaderElem)
let insertToList = insertHtmlTo(moviesListElem)
let appendToList = appendHtmlTo(moviesListElem)
let insertToErrors = insertHtmlTo(errorMessageElem)
let concatHtml = reduce(sum, '')
let pageIndex = 1
let infinteLoaderVisible

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
	return new Movie(data)
}

function searchMovies (filterText) {
	movies
		.search(filterText)
		.then(map(toMovie))
		.then(map(movieItemHtml))
		.then(concatHtml)
		.then(insertToList)
		.then(clearErrors)
		.catch(showSearchError)
}

function searchNextMovies (filterText) {
	pageIndex += 1
	movies
		.search(filterText, pageIndex)
		.then(map(toMovie))
		.then(map(movieItemHtml))
		.then(concatHtml)
		.then(appendToList)
		.catch(showSearchError)
}


function handleSearch () {
	let value = searchInputField.value

	searchMovies(value, pageIndex)
}

function handlePagination (data) {
	let value = searchInputField.value
	let visible = isVisibleInScrollParent(infinteLoaderElem, infinteScrollElem)
	let visibilityChanged = visible !== infinteLoaderVisible
	let becameVisible = visibilityChanged && visible

	infinteLoaderVisible = visible
	if (becameVisible && value) {
		searchNextMovies(value)
	}
	return data
}

on('submit', searchBoxForm, preventEvent)
on('submit', searchBoxForm, handleSearch)
on('input', searchInputField, handleSearch)
on('scroll', infinteScrollElem, handlePagination)