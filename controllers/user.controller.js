const User = require('../models/user.model.js');
const _ = require('lodash');

exports.register = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({
				message: "User Info can not be empty"
		});
	}

	let user = await User.findOne({ email: req.body.email });
	if(user) return res.status(400).send('User alredy registered');

	user = new User({
			email: req.body.email,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			company: req.body.company
	});

	user.save()
			.then(data => {
					res.send(_.pick(data, ['_id', 'email', 'firstName', 'lastName', 'company', 'tasks']));
			}).catch(err => {
					res.status(500).send({
					message: err.message || "Some error occurred while creating the User."
			});
	});
};

exports.getUsers = (req, res) => {
	User.find()
		.then(result => {
			if(result.length === 0) {
				res.send('No users');	
				return;
			}
			let response = result.map(item  => {
				return _.pick(item, ['_id', 'email', 'firstName', 'lastName', 'company']);
			});
			res.send(response);
		} );
};

exports.findOne = (req, res) => {
	User.findById(req.params.userId)
			.then(user => {
					if(!user) {
							return res.status(404).send({
									message: "User not found with id " + req.params.userId
							});
					}
					res.send(user);
			}).catch(err => {
			if(err.kind === 'ObjectId') {
					return res.status(404).send({
							message: "User not found with id " + req.params.userId
					});
			}
			return res.status(500).send({
					message: "Error retrieving user with id " + req.params.userId
			});
	});
};