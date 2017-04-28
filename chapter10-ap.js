const R = require('ramda')
const Future = require('ramda-fantasy').Future
const Identity = require('ramda-fantasy').Identity

const two = 2, three = 3;
// ap, of/map 和 lift
// map == of/ap
console.log('ap, of/map 和 lift')
console.log(Identity.of(R.add).ap(Identity.of(two)).ap(Identity.of(three)).value)
console.log(Identity.of(R.add).map(f => f(two)).map(f => f(three)).value)
console.log(Identity.of(two).map(R.add).value(three))
console.log(Identity.of(two).map(R.add(three)).value)
console.log(R.lift(R.add)(Identity.of(two), Identity.of(three)).value)
console.log()
