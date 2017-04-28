//R.IO

var R = require('ramda');
var IO = require('ramda-fantasy').IO;
var Either = require('ramda-fantasy').Either;

var trace = require('./trace')

var url = IO(function () {
	return Math.random() > 0.5 ? Either.Right('http://www.google.com?a=1&b=2#href') : Either.Left('I am a wrong url');
});

var removeHref = R.compose(R.head, R.split('#'));

var getParamStr = R.compose(R.last, R.split('?'));

var toPairs = R.compose(R.map(R.split('=')), R.split('&'));

var params = R.compose(toPairs, getParamStr, removeHref);


var findParam = function (key) {
	return R.map(
		R.compose(
			R.ifElse(R.either(R.isEmpty, R.isNil), R.partial(Either.Left, ['got nothing of param ' + key]), Either.Right),
			Either.either(function (x) {
				return x;
			}, R.compose(
				R.filter(R.compose(
					R.equals(key),
					R.head
				)),
				params
			))
		),
		url

	);
};

var r = findParam("c");
console.log(r.runIO())
