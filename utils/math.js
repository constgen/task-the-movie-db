import { curry } from './fp.js'

export let sum = curry(function sum (valueA, valueB) {
	return valueA + valueB
})