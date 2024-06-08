const express = require('express');
const TokenController = require('../controllers/Tokens')
const router = express.Router();
router.post('/',TokenController.processLogin)
router.post('/android',TokenController.androidLogin)
router.delete('/android/:token',TokenController.androidLogout)

module.exports = router