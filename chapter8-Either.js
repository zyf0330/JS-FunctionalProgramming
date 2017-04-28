var moment = require('moment')
var R = require('ramda');
var trace = require('./trace');
var Either = require('ramda-fantasy').Either;
var Left = Either.Left;
var Right = Either.Right;


console.log('first part: getAge')
	// getAge :: Date -> User -> Either(String, Number)
var getAge = R.curry(function (now, user) {
	var birthdate = moment(user.birthdate, 'YYYY-MM-DD')
	if (!birthdate.isValid()) return Left("Birth date could not be parsed");
	return Right(now.diff(birthdate, 'years'));
});

var r1 = getAge(moment(), {
	birthdate: '2005-12-12'
});
console.log('r1', r1);

var r2 = getAge(moment(), {
	birthdate: '2000704'
});
console.log('r2', r2);


console.log('\nsecond part: zoltar');

//  fortune :: Number -> String
var fortune = R.compose(R.concat("If you survive, you will be "), R.add(1));
//  zoltar :: User -> Either(String, _)
var zoltar = R.compose(R.map(console.log), R.map(fortune), getAge(moment('2015-01-01')));
zoltar({
	birthdate: '2005-12-12'
});
// "If you survive, you will be 10"
// Right(undefined)
zoltar({
	birthdate: 'balloons!'
});
// Left("Birth date could not be parsed")


console.log('\nthird part: either')

var zoltar = R.compose(console.log, Either.either(R.identity, fortune), getAge(moment('2015-01-01')));
zoltar({birthdate: '2005-12-12'})
zoltar({birthdate: 'wrong date'})
