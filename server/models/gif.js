var mongoose = require('mongoose');
var GifSchema = require('../schemas/gif'); 

module.exports = mongoose.model('Gifs', GifSchema);