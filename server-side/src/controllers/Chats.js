const ChatsServices = require("../services/Chats")

async function createChat(req,res){
    //res.json(await ChatsServices.createChat(req.myUsername, req.otherUsername))
    const toRes = await ChatsServices.createChat(req.myUsername, req.otherUsername)
    console.log(toRes)
}

//createChat({myUsername:"tomer1",otherUsername:"tomer3"},{})

async function getAllChats(req,res){
    //res.json(await ChatsServices.getAllChats(req.params[0])
    const toRes = await ChatsServices.getAllChats(req.params.username)
    console.log(toRes)
}

//getAllChats({params:{username:"tomer1"}},{})

async function getChat(req,res){
    //res.json(await ChatsServices.getChat(req.params[0])
    const toRes = await ChatsServices.getChat(req.params.chatID)
    console.log(toRes)
}
//getChat({params:{chatID:2}},{})
async function deleteChat(req,res){
    //res.json(await ChatsServices.deleteChat(req.params[0])
    const toRes = await ChatsServices.deleteChat(req.params.chatID)
    console.log(toRes)
}
//deleteChat({params:{chatID:2}},{})
async function sendMessageToChat(req,res){
    //res.json(await ChatsServices.deleteChat(req.params[0],req.params[1],req.params[2])
    const toRes = await ChatsServices.sendMessageToChat(req.params.chatID,req.params.sender,req.params.content)
    console.log(toRes)
}
//sendMessageToChat({params:{chatID:3,sender:"tomer1",content:"message from controller"}},{})


