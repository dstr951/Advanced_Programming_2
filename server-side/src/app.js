const express = require("express");
const mongoose = require('mongoose').default;

console.log(mongoose.version);
const cors = require("cors")
const bodyParser  = require("body-parser");
const routerUsers = require("./routes/Users")
const routerChats = require("./routes/Chats")
const routerToken = require("./routes/Tokens")
const app = express()
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketEvents = require("./services/SocketEvents")
const io = new Server(server, {
	cors: {
	  origin: "http://localhost:3000"
	},
  });

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

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use('/api/Users',routerUsers)
app.use('/api/Chats',routerChats)
app.use('/api/Tokens',routerToken)
socketEvents.setIO(io)
socketEvents.setupEvents()
server.listen(3001)
