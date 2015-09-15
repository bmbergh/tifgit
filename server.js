var express           = require('express'),
	app               = express(),
	bodyParser        = require('body-parser'),
	morgan			  = require('morgan'),
	mongoose          = require('mongoose'),
	router 			  = require('./server/routes');

mongoose.connect('mongodb://localhost:27017/tif');

app.use(bodyParser());
app.use(morgan('tiny'));

app.use('/js', express.static(__dirname + '/client/js'));

app.use(router());

//listen on port 3000
app.listen(3000, function(){
	console.log("I am listening");
});