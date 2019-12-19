const _ = require('lodash');
const Feedback = require('../models/feedback.model.js');


exports.getAllFeedbacks = async (req, res) => {
	try {
		let feedbacks = await Feedback.find();
		res.send(feedbacks);
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};


exports.createFeedback = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({message: "Feedback Info can not be empty"});
	}

	try {
		let feedback = new Feedback(_.pick(req.body, ['rating', 'user', 'message']));
	
		await feedback.save()
			.then(result => { return res.send(result); });
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
	
};
