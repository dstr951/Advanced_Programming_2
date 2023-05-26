const express = require("express");
const mongoose = require('mongoose').default;
const cors = require("cors")
const app = express()


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


module.exports = {mongoose}