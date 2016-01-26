var path = require('path');
var express = require('express');
var router	= express.Router();
var email = require('./controllers/email');
var gifs = require('./controllers/gifs');


module.exports = function () {

	//View Routes
	//get request to out ROOT dir fetch index.html
	router.get('/', function(req, res){
		res.sendfile(path.normalize(__dirname + '/../client/views/index.html'));
		console.log("hello world");
	});

	router.get('/gifs', function(req, res){
		res.sendfile(path.normalize(__dirname + '/../client/views/gifs.html'));
	});

	//Email Routes
	router.put('/share', email.send);

	//Gifs Routes
	router.get('/gifs/search', gifs.search);
	router.get('/gifs/random', gifs.random);

	router.post('/gifs', gifs.create);

	/**
	 * :id can be accessed in the controller with req.param.id
	 * :id represents the value that was passed in by the client in that section of the url.
	 * 
	 * Client Url: "/gifs/123/like"
	 * req.params.id would equal 123
	 */
	router.put('/gifs/:id/like', gifs.like);
	router.put('/gifs/:id/dislike', gifs.dislike);

	return router;
};