var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GifSchema = new Schema({
	url: String,
	dislikes: Number,
	likes: Number,
	shares: Number,
	tags: [String]
});

module.exports = GifSchema;