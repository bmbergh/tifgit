var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GifSchema = new Schema({
	url: {type: String, required: true},
	dislikes: Number,
	likes: Number,
	shares: Number,
	tags: [String],
	deleted: { type: Boolean, default: false}
});

module.exports = GifSchema;