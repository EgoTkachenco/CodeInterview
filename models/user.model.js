const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 4,
		maxlength: 25
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024
	},
	firstName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 25
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 25
	},
	company: {
		type: String,
		minlength: 2,
		maxlength: 25
	},
	tasks: [
			{
				taskId: mongoose.SchemaTypes.ObjectId
			}
	],
	
});

module.exports = mongoose.model('User', userSchema);