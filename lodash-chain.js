var _ = require('lodash')
var map = require('lodash/fp/map');
var flatten = require("lodash/fp/flatten");
var sortBy = require("lodash/fp/sortBy");
var flow = require("lodash/fp/flow");


var r1 = _.chain([1, 2, 3])
	.map(x => [x, x * 2])
	.flatten()
	.sort()
	.value();

var r2 = flow(
	map(x => [x, x * 2]),
	flatten,
	sortBy(x => x)
)([1, 2, 3]);
console.log(r1, r2)
