const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 2,
		maxlength: 25,
		required: true
	},
	description: {
		type: String,
		maxlength: 256	
	},
	isPublic: {
		type: Boolean,
		default: false
	},
	language_id: {
		type: String,
		require: true
	},
	author: {
		type: mongoose.SchemaTypes.ObjectId
	},
	tests: [
		{
			input: {
			},
			output: {
			}
		}
	],
	stars: {
		type: Number,
		default: 0
	}
});

taskSchema.methods.used = function() {
	this.stars++;
	return this.stars;
};


module.exports = mongoose.model('Task', taskSchema);