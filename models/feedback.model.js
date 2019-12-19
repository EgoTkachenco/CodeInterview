const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
	message: {
		type: String,
	},
	rating: {
		type: Number,
		required: true
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId
	},
	
});

module.exports = mongoose.model('Feedback', feedbackSchema);