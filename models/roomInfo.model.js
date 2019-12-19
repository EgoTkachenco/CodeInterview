const mongoose = require('mongoose');

const roomInfoSchema = new mongoose.Schema({
	tasks: [{
		id: {
			type: mongoose.SchemaTypes.ObjectId
		},
		name: {
			type: String
		}
	}],
	language: {
		id:{
			type: String
		},
		name: {
			type: String
		}
	},
	startTime: {
		required: true,
		type: Number
	},
	duration: {
		required: true,
		type: Number
	},
	codeResults: [{
		compileResponse: {
			passed: Number,
			failed: Number,
			// shortDescription: 
		},
		task_id: {
			type: mongoose.SchemaTypes.ObjectId
		}
	}]
	
});

module.exports = mongoose.model('RoomInfo', roomInfoSchema);