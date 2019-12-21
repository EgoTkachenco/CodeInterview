const mongoose = require('mongoose');

const roomInfoSchema = new mongoose.Schema({
	tasks: [{
		task_id: {
			type: mongoose.SchemaTypes.ObjectId
		},
		name: {
			type: String
		},
		attemptsCount:{
			require: true,
			type: Number,
			defauld: 0
		},
		isPassed: {
			required: true,
			type: Boolean,
			defauld: false
		},
		finishedCode: {
			type: String
		},
		decisionTime: {
			type: Number,
			defauld: 0
		}
	}],
	creator: {
		required: true,
		type: mongoose.SchemaTypes.ObjectId
	},
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
	}
	
});

module.exports = mongoose.model('RoomInfo', roomInfoSchema);