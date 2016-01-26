var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	}
})

module.exports = UserSchema;