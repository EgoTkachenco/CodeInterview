const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const auth = require('../middleware/auth.js');

router.get('/myTasks', auth, taskController.getMyTasks);

router.get('/allTasks', taskController.getAllTasks);

router.get('/task/:id', auth, taskController.getOneTask);

router.post('/task/:id', auth, taskController.editTask);

router.put('/task', auth, taskController.createTask);

router.delete('/task/:id', auth, taskController.deleteTask);

router.post('/like/:id', auth, taskController.starTask);

router.post('/changePublic/:id', auth, taskController.changePublic);

module.exports = router;
