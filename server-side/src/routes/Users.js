const express = require('express');
const UsersController = require('../controllers/Users')
const TokensController = require("../controllers/Tokens")
const router = express.Router();

module.exports = router;



router.get('/:username',TokensController.TokenService.isLoggedIn,UsersController.getUserInfo);
router.post('/',UsersController.registerUser);