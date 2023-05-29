const ChatsServices = require("../services/Chats")
const {extractUserName} = require("../services/Tokens");
const {getUserInfo} = require("../services/Users");

async function createChat(req,res){
    const temp = await ChatsServices.createChat(extractUserName(req), req.body.username)
    const moreTemp = (await getUserInfo(temp.body.username)).body
    res.status(temp.status).send({id:temp.body.id,user:moreTemp})

}



async function getAllChats(req,res){
    const temp = (await ChatsServices.getAllChats(extractUserName(req)))
    res.status(temp.status).send(temp.body)
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
async function getAllMessages(req,res){
    res.json(await ChatsServices.getAllMessages(req.params.id))
}


module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat, getAllMessages
}