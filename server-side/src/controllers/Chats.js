const ChatsServices = require("../services/Chats")

async function createChat(req,res){
    //todo add function that extracts username from token
    res.json(await ChatsServices.createChat(req.body.myUsername, req.body.username))
    //const toRes = await ChatsServices.createChat(req.myUsername, req.otherUsername)
    //console.log(toRes)
}

//createChat({myUsername:"tomer1",otherUsername:"tomer3"},{})

async function getAllChats(req,res){
    //todo add function that extracts username from token
    res.json(await ChatsServices.getAllChats(req.body.username))
    //const toRes = await ChatsServices.getAllChats(req.params.username)
    //console.log(toRes)
}

//getAllChats({params:{username:"tomer1"}},{})

async function getChat(req,res){
    res.json(await ChatsServices.getChat(req.params.id))
    //const toRes = await ChatsServices.getChat(req.params.chatID)
    //console.log(toRes)
}
//getChat({params:{chatID:2}},{})
async function deleteChat(req,res){
    res.json(await ChatsServices.deleteChat(req.params.id))
    //const toRes = await ChatsServices.deleteChat(req.params.chatID)
    //console.log(toRes)
}
//deleteChat({params:{chatID:2}},{})
async function sendMessageToChat(req,res){
    //todo add function that extracts username from token
            res.json(await ChatsServices.sendMessageToChat(req.params.id,req.body.username,req.body.msg))
    //const toRes = await ChatsServices.sendMessageToChat(req.params.chatID,req.params.sender,req.params.content)
    //console.log(toRes)
}
//sendMessageToChat({params:{chatID:3,sender:"tomer1",content:"message from controller"}},{})


module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat
}