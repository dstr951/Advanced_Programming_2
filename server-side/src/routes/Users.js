const express = require('express');
const UsersController = require('../controllers/Users')

const router = express.Router();

router.get('/:username',UsersController.getUserInfo);
router.post('/',UsersController.registerUser);

module.exports = router;