export function curry (func) {
	return function currify (...args) {
		return args.length >= func.length ?
			func(...args) :
			currify.bind(null, ...args)
	}
}

export let map = curry(function map (callback, array) {
	return array.map(callback)
})

export let reduce = curry(function reduce (callback, accumulator, array) {
	return array.reduce(callback, accumulator)
})


export let forEach = curry(function forEach (callback, array) {
	return array.forEach(callback)
})