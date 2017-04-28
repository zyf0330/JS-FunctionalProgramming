var R = require('ramda');
//practice 1
var words = R.split(' ');
// console.log('practice 1:')
// console.log(words('I have an apple.'))
//practice 1a
var sentences = ['I have an apple', 'who are you'];
var words = R.map(words)
	// console.log('practice 1a')
	// console.log(words(sentences))
	//practice 2
var match = R.curry(function (reg, x) {
	return x.match(reg);
});
var filterQs = R.filter(match(/q/i));
// console.log('practice 2')
// console.log(filterQs(['qs', 's', 'iq', 'is']))
//practice 3
var _keepHighest = function (x, y) {
	return x >= y ? x : y;
}
var reduce = R.curry(function (fx, initV, arr) {
	return arr.reduce(fx, initV);
})
var max = function (xs) {
		return reduce(function (acc, x) {
			return _keepHighest(acc, x);
		}, -Infinity, xs)
	}
	// console.log('practice 3')
	// console.log(max([5, 2, 3]))
	//bonus 1
var slice = R.curry(function (start, end, arr) {
		return arr.slice(start, end);
	})
	// console.log('bonus 1')
	// console.log(slice(1, 2)([1,2,3,4]))
	//bonus 2
var take = slice(0);
console.log('bonus 2')
console.log(take(3)([1, 2, 3, 4]))

function curry(fx) {
	var arity = fx.length;
	return function f1() {
		var args = Array.prototype.slice.call(arguments, 0);
		if (args.length >= arity) {
			return fx.apply(null, args);
		} else {
			var f2 = function f2() {
				var args2 = Array.prototype.slice.call(arguments, 0);
				return f1.apply(null, args.concat(args2));
			}
			f2.toString = function () {
				return inspectFn(fx) + inspectArgs(args);
			}
			return f2;
		}
	};
}
