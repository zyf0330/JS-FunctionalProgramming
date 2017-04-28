var R = require('ramda');

var trace = R.curry(function (label, val) {
	console.log('[' + label + '] ' + JSON.stringify(val));
	return val;
});
module.exports = trace;
