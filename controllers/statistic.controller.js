const _ = require('lodash');
const RoomInfo = require('../models/roomInfo.model.js');

exports.getPopularLang = async (req, res) => {
	try {
		let rooms = await RoomInfo.find();
		let result = [];
		rooms.map(item => {
			if(item.language.id) {
				if(result[item.language.id]) {
					result[item.language.id].sum++;
				} else {
					result[item.language.id] = { sum: 1, name: item.language.name };
				}
			}
		});
		
		res.send(_.compact(result));
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};

exports.getTimeStat = async (req, res) => {
	try {
		let rooms = await RoomInfo.find();
		let result = [];
		for(let index = 0; index < 24; index++) {
			result[index] = { sum: 0, name: index.toString().length === 1 ? '0' + index.toString() + ':00' : index.toString() + ':00' };
		}
		rooms.map(item => {
			if(item.startTime) {
				let index = new Date(item.startTime).getHours();
				result[index].sum++;
			}
		});
		
		res.send(_.compact(result));
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};