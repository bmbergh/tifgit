
exports.send = function(request, response){
	console.log('Goodies: ', request.body);
	response.status(200).send(request.body);
}