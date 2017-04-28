const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe
const IO = require('ramda-fantasy').IO
const Future = require('ramda-fantasy').Future
const Either = require('ramda-fantasy').Either

// practice 1
var safeProp = R.curry((x, o) => Maybe.of(o[x]))

var user = {
	id: 2,
	name: 'albert',
	address: {
		street: {
			number: 22,
			name: 'walnut St'
		}
	}
}

var ex1 = R.pipe(safeProp('address'), R.chain(safeProp('street')), R.chain(safeProp('name')))

console.log('practice 1')
console.log(ex1(user))


// practice 2
var getFile = () => new IO(() => __filename)
var getName = file => file.substring(file.lastIndexOf('/') + 1)
var pureLog = (x) => new IO(() => {
	console.log(x);
	return 'logged ' + x
})

var ex2 = () => R.chain(pureLog, getFile().map(getName)).runIO()

console.log('practice 2')
console.log(ex2())

//practice 3
var getPost = i => new Future((reject, resolve) => setTimeout(
	() => resolve({
		id: i,
		title: 'Love them futures'
	}), 300
))

var getComments = i => new Future((rej, res) => setTimeout(
	() => res([{
		post_id: i,
		body: "This book should be illegal"
	}, {
		post_id: i,
		body: "Monads are like smelly shallots"
	}]), 300
))

var ex3 = () => getPost('id').map(R.prop('id')).chain(getComments);
ex3 = () => getPost('id').chain(R.pipe(R.prop('id'), getComments))

console.log('practice 3')
ex3().fork((e) => console.error(e), x => console.log(x))

// practice 4
var addToMailingList = (function (list) {
	return function (email) {
		return new IO(function () {
			list.push(email);
			return list;
		});
	}
})([]);

function emailBlast(list) {
	return new IO(function () {
		return 'emailed: ' + list.join(',');
	});
}
var validateEmail = function (x) {
	return x.match(/\S+@\S+\.\S+/) ? (new Either.Right(x)) : (new Either.Left('invalid email '));
}

// ex4 :: Email -> Either String (IO String)
var ex4 = email => addToMailingList(email).chain(emailBlast).map(validateEmail)

console.log('practice 4')
console.log(ex4('q@qq.com').runIO())
