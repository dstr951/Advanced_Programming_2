const ChatsServices = require("../services/Chats")
const {extractUserName} = require("../services/Tokens");

async function createChat(req,res){
    res.json(await ChatsServices.createChat(extractUserName(req), req.body.username))
    //const toRes = await ChatsServices.createChat(req.myUsername, req.otherUsername)
    //console.log(toRes)
}



async function getAllChats(req,res){
    res.json(await ChatsServices.getAllChats(extractUserName(req)))
    //const toRes = await ChatsServices.getAllChats(req.params.username)
    //console.log(toRes)
}



async function getChat(req,res){
    res.json(await ChatsServices.getChat(req.params.id))
    //const toRes = await ChatsServices.getChat(req.params.chatID)
    //console.log(toRes)
}

async function deleteChat(req,res){
    res.json(await ChatsServices.deleteChat(req.params.id))
    //const toRes = await ChatsServices.deleteChat(req.params.chatID)
    //console.log(toRes)
}

async function sendMessageToChat(req,res){

            res.json(await ChatsServices.sendMessageToChat(req.params.id,extractUserName(req),req.body.msg))
    //const toRes = await ChatsServices.sendMessageToChat(req.params.chatID,req.params.sender,req.params.content)
    //console.log(toRes)
}


module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat
}