var gif = require('../models/gif');
var debug = require('debug')('tif:controllers:gifs');

exports.get = function (req, res, next){
	gif.find({_id: '55f637adfb89ae4e186692eb'}, function (error, data) {
		debug(error, data);

		if(error) return res.status(500).json(error);
		return res.status(200).json(data);
	});
}

exports.create = function (req, res, next) {
	debug(req.body);

	var body = req.body;
	body.tags = body.tags.split(',');

	gif.create(body, function (error, data) {
		debug(error, data);

		if (error) return res.status(500).json(error);
		return res.status(200).json(data);
	});

}

exports.like = function (req, res){

	var query = { _id: '55f637adfb89ae4e186692eb'};
	gif.findOneAndUpdate(query, {$inc: {likes: 1}}, function (error, data){
		debug(error, data);

		if(error) return res.status(500).json(error);
		return res.status(200).json(data);
	});	

}

exports.dislike = function(req, res){
	var query = {_id: '55f637adfb89ae4e186692eb' };
	gif.findOneAndUpdate(query, {$inc: {dislikes: 1}}, function (error, data){
		debug(error, data);

		if(error) return res.status(500).json(error);
		return res.status(200).json(data);
	});
}