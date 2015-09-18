var express           = require('express'),
	app               = express(),
	bodyParser        = require('body-parser'),
	morgan			  = require('morgan'),
	mongoose          = require('mongoose'),
	router 			  = require('./server/routes'),
	path              = require('path');

mongoose.connect('mongodb://localhost:27017/tif');

app.use(bodyParser());
app.use(morgan('tiny'));

app.use('/static', express.static(path.join(__dirname, '/client')));
app.use('/public', express.static(path.join(__dirname, '/public')));


// app.get('*', function(req, res){
// 	res.sendfile('index.html');
// });

app.use(router());

//listen on port 3000
app.listen(3000, function(){
	console.log("I am listening");
});