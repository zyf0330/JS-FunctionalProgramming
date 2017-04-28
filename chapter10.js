var Task = require('folktale').data.task.task;
const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe
const IO = require('ramda-fantasy').IO

const localStorage = {}

// practice 1

var ex1 = (x, y) => Maybe.of(R.add).ap(Maybe(x)).ap(Maybe(y))
console.log('practice 1')
console.log(ex1(1, 3))

//practice 2

var ex2 = (x, y) => R.lift(R.add)(x, y)

console.log('practice 2')
console.log(ex2(Maybe(1), Maybe(2)))

// practice 3

var makeComments = R.reduce(function (acc, c) {
	return acc + "<li>" + JSON.stringify(c) + "</li>"
}, "");
var render = R.curry(function (p, cs) {
	return "<div>" + p.title + "< / div > " + makeComments(cs);
});
var getPost = function (i) {
	return Task(function (resolver) {
		setTimeout(function () {
			resolver.resolve({
				id: i,
				title: 'Love them tasks'
			});
		}, 1);
	});
}
var getComments = function (i) {
	return Task(function (resolver) {
		Math.random() > 0.7 ? resolver.reject('errorerror') :
		setTimeout(function () {
			resolver.resolve([{
				post_id: i,
				body: "This book should be illegal"
			}, {
				post_id: i,
				body: "Monads are like smelly shallots"
			}]);
		}, 1);
	});
}


var ex3 = R.lift(render)(getPost(1), getComments(1))

console.log('practice 3')
ex3.run().promise().then(
	err => console.error(err),
	x => console.log(x)
)

// practice 4
localStorage.player1 = 'toby'
localStorage.player2 = 'sally'

var getCache = x => new IO(() => localStorage[x])

var game = R.curry((p1, p2) => p1 + ' vs ' + p2)


console.log('practice 4')
console.log(R.lift(game)(getCache('player1'), getCache('player2')).runIO())
