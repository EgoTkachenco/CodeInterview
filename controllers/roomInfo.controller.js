const _ = require('lodash');
const RoomInfo = require('../models/roomInfo.model.js');


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
			.then(result => { return res.send(result); });
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
	
};
