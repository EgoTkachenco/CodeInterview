const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.js');

/* GET users listing. */
router.get('/', auth, userController.getUsers);

router.post('/register', userController.register);

router.post('/auth', userController.auth);

router.get('/me', auth, userController.getUser);

module.exports = router;
