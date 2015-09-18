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
	router.post('/send', email.send);

	//Gifs Routes
	router.get('/gifs/search', gifs.search);
	router.post('/gifs', gifs.create);
	router.put('/gifs/like', gifs.like);
	router.put('/gifs/dislike', gifs.dislike);


	return router;
};