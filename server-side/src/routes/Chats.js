const express = require('express');
const ChatsController = require('../controllers/Chats')
const TokensController = require("../controllers/Tokens")
const router = express.Router();

// router.get('/',ChatsController.getAllChats);
// router.post('/',ChatsController.createChat);
// router.get('/:id',ChatsController.getChat);
// router.delete('/:id',ChatsController.deleteChat);
// router.post('/:id/Messages',ChatsController.sendMessageToChat);

module.exports = router;


router.get('/',TokensController.TokenService.isLoggedIn,ChatsController.getAllChats);
router.post('/',TokensController.TokenService.isLoggedIn,ChatsController.createChat);
router.get('/:id',TokensController.TokenService.isLoggedIn,ChatsController.getChat);
router.delete('/:id',TokensController.TokenService.isLoggedIn,ChatsController.deleteChat);
router.post('/:id/Messages',TokensController.TokenService.isLoggedIn,ChatsController.sendMessageToChat);
router.get('/:id/Messages',TokensController.TokenService.isLoggedIn,ChatsController.getAllMessages);