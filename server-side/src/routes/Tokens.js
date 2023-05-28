const express = require('express');
const TokenController = require('../controllers/Tokens')
const router = express.Router();
router.post('/',TokenController.processLogin)

module.exports = router