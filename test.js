var R = require('ramda');

var srcs = R.compose(R.map(mediaUrl), R.prop('items'));
var images = R.compose(R.map(img), srcs);


var images = R.compose(R.compose(R.map(img), R.map(mediaUrl)), R.prop('items'));



var mediaUrl = R.compose(R.prop('m'), R.prop('media'));
var mediaToImg = R.compose(img, mediaUrl)
R.compose(
	R.map(mediaToImg),
	R.prop('items')
);
