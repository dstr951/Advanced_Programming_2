const express = require("express");
const mongoose = require('mongoose').default;

console.log(mongoose.version);
const cors = require("cors")
const bodyParser  = require("body-parser");
const routerUsers = require("./routes/Users")
const routerChats = require("./routes/Chats")
const routerToken = require("./routes/Tokens")
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

mongoose.connect('mongodb://0.0.0.0:27017/latestDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use('/api/Users',routerUsers)
app.use('/api/Chats',routerChats)
app.use('/api/Tokens',routerToken)
app.listen(3001)

exports.isLoggedIn = (req, res, next) => {
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




module.exports = {jwt,key}