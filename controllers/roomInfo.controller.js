const _ = require('lodash');
const RoomInfo = require('../models/roomInfo.model.js');
const Task = require('../models/task.model.js');

exports.getAllRooms = async (req, res) => {
	try {
		let rooms = await RoomInfo.find();
		res.send(rooms);
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};


exports.saveRoom = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({message: "Room Info can not be empty"});
	}

	try {
		let room = new RoomInfo(_.pick(req.body, ['tasks', 'duration', 'language', 'startTime', 'creator']));
	
		await room.save()
			.then(result => { 
				result.tasks.map(async item => {
					let task = await Task.findById(item.task_id);
					if(task) {
						task.used();
						task.setAverageTime(item.decisionTime);
						task.save();
					}
				})	
				return res.send(result); 
			});
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
	
};

exports.predictSessionTime = async (req, res) => {
	let tasks = req.query.tasks.split(',');
	let averageTimes = [];
	let stat = await RoomInfo.find();

	for(let i=0; i<tasks.length; i++) {
		stat.map(item => {
			item.tasks.map(taskReport => {
				if(taskReport.task_id && taskReport.task_id.toString() == tasks[i]) {
					if(averageTimes[tasks[i]]) {
						averageTimes[tasks[i]] = (averageTimes[tasks[i]] + taskReport.decisionTime)/2;
					} else {
						averageTimes[tasks[i]] = taskReport.decisionTime ? taskReport.decisionTime : 0;
					}
				}
			});
		});
	}
	res.send(averageTimes)
}
