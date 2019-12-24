const Task = require('../models/task.model.js');
const _ = require('lodash');
const User = require('../models/user.model.js');

exports.getMyTasks = async (req, res) => {
	try {
		let tasks = await Task.find({author: req.user._id, language_id: req.query.language});
		res.send(tasks);
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};

exports.getAllTasks = async (req, res) => {
	try {
		let tasks = await Task.find({isPublic: true, language_id: req.query.language});
		res.send(tasks);
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};

exports.getOneTask = async (req, res) => {
	try{
		const task = await Task.findById(req.params.id);
		return res.send(task);
	}
	catch(ex) {
		return res.status(200).send(ex.message);
	}
};

exports.editTask = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({message: "No Changes"});
	}

	try {
		let task = await Task.findById(req.params.id);
		console.log(req.params.id);
		const newTask = _.pick(req.body, ['title', 'description', 'language_id', 'isPublic', 'tests']);
		task.title = newTask.title || task.title;
		task.description = newTask.description || task.description;
		task.language_id = newTask.language_id || task.language_id;
		task.tests = newTask.tests || task.tests;
		task.isPublic = newTask.isPublic || task.isPublic;
		task.save()
			.then(result => { res.send(result); });
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}

};

exports.createTask = async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({message: "Task Info can not be empty"});
	}

	try {
		console.log(req.body);
		let task = new Task(_.pick(req.body, ['title', 'description', 'language_id', 'tests', 'isPublic']));

		task.author = req.user._id;
	
		await task.save()
			.then(result => { return res.send(result); });
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
	
};

exports.deleteTask = async (req, res) => {
	try{
		const task = await Task.findByIdAndDelete(req.params.id);
		if(!task) return res.send({ message: 'Task don`t found'});

		return res.send({ message: 'Delete Successfull', task });
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
};

exports.changePublic = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		task.isPublic = req.body.isPublic;
		await task.save();
		return res.send({message: 'Status Changed'});	
	} 
	catch (ex) {
		return res.status(500).send(ex.message);
	}

};

exports.starTask = async (req, res) => {
	try {		
		const user = await User.find(req.user._id);
		const task = await Task.findById(req.params.id);
		task.used();
		let updTask = await task.saved();
		user.tasks.push(updTask._id);		
		return res.send({message: 'Ok'});	
	} 
	catch (ex) {
		return res.status(500).send(ex.message);
	}

};