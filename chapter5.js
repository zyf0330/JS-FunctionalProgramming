var R = require('ramda');

//	示例数据
var CARS = [{
	name: "Ferrari	FF",
	horsepower: 660,
	dollar_value: 700000,
	in_stock: true
}, {
	name: "Spyker	C12	Zagato",
	horsepower: 650,
	dollar_value: 648000,
	in_stock: false
}, {
	name: "Jaguar	XKR-S",
	horsepower: 550,
	dollar_value: 132000,
	in_stock: false
}, {
	name: "Audi	R8",
	horsepower: 525,
	dollar_value: 114200,
	in_stock: false
}, {
	name: "Aston	Martin	One-77",
	horsepower: 750,
	dollar_value: 1850000,
	in_stock: true
}, {
	name: "Pagani	Huayra",
	horsepower: 700,
	dollar_value: 1300000,
	in_stock: false
}];

//practice 1
var isLastInStock = R.compose(R.prop('in_stock'), R.last)
console.log('practice 1')
console.log(isLastInStock(CARS));

//practice 2
var nameOfFirstCar = R.compose(R.prop('name'), R.head)
console.log('practice 2')
console.log(nameOfFirstCar(CARS));

//practice 3
var _average = function (xs) {
	return R.reduce(R.add, 0, xs) / xs.length;
};
var averageDollarValue = R.compose(_average, R.map(R.prop('dollar_value')))

console.log('practice 3')
console.log(averageDollarValue(CARS));

//practice 4
var _underscore = R.replace(/\W+/g, '_');

var sanitizeNames = R.map(R.compose(R.toLower, _underscore, R.prop('name')))

console.log('practice 4')
console.log(sanitizeNames(CARS))

//bonus 1
var formatMoney = function (x) {
	return x
}
var availablePrices = R.compose(
	R.join(',	'),
	R.map(R.compose(formatMoney, R.prop('dollar_value'))),
	R.filter(R.prop('in_stock'))
)

console.log('bonus 1')
console.log(availablePrices(CARS))

//bonus 2
var fastestCar = R.compose(
	R.flip(R.concat)('	is	the	fastest'),
	R.prop('name'),
	R.last,
	R.sortBy(R.prop('horsepower'))
);

console.log('bonus 2')
console.log(fastestCar(CARS))
