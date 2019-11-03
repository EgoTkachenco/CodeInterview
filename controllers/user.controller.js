const User = require('../models/user.model.js');
const _ = require('lodash');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({
				message: "User Info can not be empty"
		});
	}

	let user = await User.findOne({ email: req.body.email });
	if(user) return res.status(400).send('User alredy registered');

	user = new User(_.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'company']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt); 
	user.save()
			.then(data => {
				const token = data.generateAuthToken();
				res.header('x-auth-token', token).send(_.pick(data, ['_id', 'email', 'firstName', 'password', 'lastName', 'company', 'tasks']));
			}).catch(err => {
					res.status(500).send({
					message: err.message || "Some error occurred while creating the User."
			});
	});
};

exports.auth = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({
			message: "Invalid user data"
		});
	}
	const user = await User.findOne({email: req.body.email});
	if(!user) return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if(!validPassword) return res.status(400).send('Invalid email or password');

	const token = user.generateAuthToken(); 

	return res.send(token);
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

exports.getUser = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
};

