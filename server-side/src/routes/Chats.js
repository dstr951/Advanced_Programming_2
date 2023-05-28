const express = require('express');
const ChatsController = require('../controllers/Chats')

const router = express.Router();

router.get('/',ChatsController.getAllChats);
router.post('/',ChatsController.createChat);
router.get('/:id',ChatsController.getChat);
router.delete('/:id',ChatsController.deleteChat);
router.post('/:id/Messages',ChatsController.sendMessageToChat);

module.exports = router;