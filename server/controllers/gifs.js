var gif = require('../models/gif');
var debug = require('debug')('tif:controllers:gifs');
var request = require('request');

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

exports.search = function (req, res){
	debug(req.query);

	var query = {tags: req.query.tag};
	gif.find(query, function (error, data){
		debug(error, data);

		if(error) return res.status(500).json(error);
		if(data.length > 0) return res.status(200).json(data);

		debug('None shall pass!');

		request('http://api.giphy.com/v1/gifs/search?q='+req.query.tag+'&api_key=dc6zaTOxFJmzC', function (error, response, body){
			debug('Error: ', error)
			if (error) return res.status(500).json(error);

			//debug("Body:", JSON.parse(body));
			var giphyObjects = JSON.parse(body).data;
			var formattedObjects = formatGifObjects(giphyObjects);

			debug('formattedObjects: ', formattedObjects);
			
			gif.create(formattedObjects, function (error, data){
				debug(error, data);

				if(error) return res.status(500).json(error);
				return res.status(200).json(data);
			})

		});
	});																									
}

/*
 * Description: Format the gif objects
 * giphyObjects param: array of objects returned from gify api
 */
function formatGifObjects(giphyObjects) {
  
  //This will loop through each gif in the gifs array and return a new array
  var formattedGifs = giphyObjects.map(function(gif){ //gif is the gif object that you got back from the giphy api
    return {
        url: gif.images.fixed_height.url,
		dislikes: 0,
		likes: 0,
		shares:0,
		tags: ['cat'],
		deleted: false
      
    };
  });
  
  //Return the formatted Gifs array so you can save the new docs in mongo
  debug(formattedGifs);
  return formattedGifs;
  
}





