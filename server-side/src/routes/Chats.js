const express = require('express');
const ChatsController = require('../controllers/Chats')
// const fromApp = require("../app")`
const router = express.Router();

// router.get('/',ChatsController.getAllChats);
// router.post('/',ChatsController.createChat);
// router.get('/:id',ChatsController.getChat);
// router.delete('/:id',ChatsController.deleteChat);
// router.post('/:id/Messages',ChatsController.sendMessageToChat);

module.exports = router;

/*
TEMP ONLY BECAUSE IMPORT FROM APP DOESN'T WORK  YET
 */
const isLoggedIn = (req, res, next) => {
// If the request has an authorization header
    if (req.headers.authorization) {
// Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
// Verify the token is valid
            const data = jwt.verify(token, key);
            console.log('The logged in user is: ' + data.username);
// Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(403).send('Token required');
}
const jwt = require("jsonwebtoken");
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

router.get('/',isLoggedIn,ChatsController.getAllChats);
router.post('/',isLoggedIn,ChatsController.createChat);
router.get('/:id',isLoggedIn,ChatsController.getChat);
router.delete('/:id',isLoggedIn,ChatsController.deleteChat);
router.post('/:id/Messages',isLoggedIn,ChatsController.sendMessageToChat);