var R = require('ramda');
var Maybe = require('ramda-fantasy').Maybe;
var Identity = require('ramda-fantasy').Identity;
var Future = require('ramda-fantasy').Future;
var Either = require('ramda-fantasy').Either;
var IO = require('ramda-fantasy').IO;

//practice 1

var ex1 = R.map(R.add(1))

console.log('practice 1')
console.log(ex1([1]))
console.log(ex1(Maybe(1)))

//practice 2

var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
var ex2 = R.map(R.head)

console.log('\npractice 2')
console.log(ex2(xs))

//practice 3

var safeProp = R.curry((x, o) => Maybe(o[x]))
var user = {
	id: 2,
	name: 'Alert'
}

var ex3 = R.pipe(
	safeProp('name'),
	R.map(R.head)
)

console.log('\npractice 3')
console.log(ex3(user).getOrElse('no name'));
console.log(ex3({}).getOrElse('no name'));


//practice 4
var ex4 = function (n) {
	if (n) {
		return parseInt(n)
	}
}
ex4 = R.pipe(
	Maybe,
	R.map(parseInt)
)

console.log('\npractice 4')
console.log(ex4())
console.log(ex4(5.5))

// practice 5
var getPost = function (i) {
	return new Future(function (rej, res) {
		setTimeout(function () {
			res({
				id: i,
				title: 'Love	them	futures'
			})
		}, 300)
	});
}
var ex5 = getPost(1).map(
	R.pipe(
		R.prop('title'),
		R.toUpper
	)
)

console.log('\npractice 5')

ex5.fork(err => console.log(err), x => console.log('\n', x, '\n'))

// practice 6
var showWelcome = R.compose(R.concat("Welcome	"), R.prop('name'))
var checkActive = function (user) {
	return user.active ? Either.Right(user) : Either.Left('Your	account	is	not	active')
}
var ex6 = R.pipe(
	checkActive,
	Either.either(
		R.identity,
		showWelcome
	)
)

console.log('\npractice 6')
console.log(ex6({active: true, name: 'name'}))
console.log(ex6({active: false}))


// practice 7
var	ex7	=	function(x)	{
		return	x.length > 3 ? Either.Right(x) : Either.Left('You need > 3')	//	<---	write	me.	(don't	be	pointfree)
}

console.log('\npractice 7')
console.log(ex7([1, 2, 3]))
console.log(ex7([1, 2, 3, 4]))

// practice 8
var	save	=	function(x){
		return	new	IO(function(){
				console.log("SAVED	USER!");
				return	x	+	'-saved';
		});
}
var	ex8	=	R.pipe(
	ex7,
	Either.either(
		IO.of,
		save
	)
)

console.log('\npractice 8')
console.log(ex8('hihihi').runIO())
console.log(ex8('hi').runIO())
