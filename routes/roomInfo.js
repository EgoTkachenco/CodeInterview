const express = require('express');
const router = express.Router();
const roomInfoController = require('../controllers/roomInfo.controller.js');

router.get('', roomInfoController.getAllRooms);

router.put('', roomInfoController.saveRoom);

module.exports = router;
