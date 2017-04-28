var R = require('ramda');
var Task = require('folktale').data.task.task;
var IO = require('ramda-fantasy').IO;
var Either = require('ramda-fantasy').Either;
var Maybe = require('ramda-fantasy').Maybe;
var trace = require('./trace')


// readFile :: _ -> Task Error String
var readFile = function () {
	return Task(function (resolver) {
		var readFile = function (handle) {
			return Math.random() > 0.7 ? handle('wrong in readFile') : Math.random() > 0.4 ? handle(null, 'db://address') :
				handle(null, 'wrong db url');
		}
		return readFile(function (err, data) {
			return err ? resolver.reject(err) : resolver.resolve(data);
		});
	});
}

// validUrl :: String -> Either Error String
var validUrl = function (urlStr) {
	return urlStr.indexOf('db://') == 0 ? Either.Right(urlStr) : Either.Left('some problem occur in validUrl');
}

// getDB :: url -> DB
var getDB = R.compose(R.objOf('info'), R.concat('connect to DB: '));

// connectDB :: url -> IO DBConnection
var connectDB = url => IO(() => getDB(url))

// getConfigAndConnectDB :: _ -> IO DBConnection
var getConfigAndConnectDB = R.compose(
	R.map(R.compose(R.map(connectDB), validUrl)),
	readFile
);
// queryDBInfo :: DBConnection -> String
var queryDBInfo = R.prop('info')

var r = getConfigAndConnectDB().run().promise()
	.then(Either.either(
		err => console.error(err),
		io => console.log(io.runIO())
	))
	.catch(e => console.error(e))
