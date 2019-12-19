const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller.js');

router.get('/', feedbackController.getAllFeedbacks);

router.put('/', feedbackController.createFeedback);

module.exports = router;
