const express = require('express');
const UsersController = require('../controllers/Users')
const fromApp = require("../app")
const router = express.Router();
// router.get('/:username',fromApp.isLoggedIn,UsersController.getUserInfo);
// router.post('/',fromApp.isLoggedIn,UsersController.registerUser);
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

router.get('/:username',isLoggedIn,UsersController.getUserInfo);
router.post('/',UsersController.registerUser);