const express = require("express");
const mongoose = require('mongoose').default;

console.log(mongoose.version);
const cors = require("cors")
const bodyParser  = require("body-parser");
const routerUsers = require("./routes/Users")
const routerChats = require("./routes/Chats")


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
app.listen(3001)




module.exports = mongoose