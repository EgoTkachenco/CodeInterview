const express = require('express');
const router = express.Router();
const roomInfoController = require('../controllers/roomInfo.controller.js');

router.get('', roomInfoController.getAllRooms);

router.put('', roomInfoController.saveRoom);

router.get('/predictSessionTime', roomInfoController.predictSessionTime)

module.exports = router;
