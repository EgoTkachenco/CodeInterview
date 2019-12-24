const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statistic.controller.js');

router.get('/getPopularLang', statisticController.getPopularLang);

router.get('/getTimeStat', statisticController.getTimeStat);


module.exports = router;
