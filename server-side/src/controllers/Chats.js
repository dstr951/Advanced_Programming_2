const ChatsServices = require("../services/Chats")
const {extractUserName} = require("../services/Tokens");
const {getUserInfo} = require("../services/Users");
const responseChat = require("../responses/Chats")
const socketEvents = require("../services/SocketEvents")
const {newMessageFirebase, newContactFirebase} = require("../services/FirebaseEvents")
const TokenService = require("../services/Tokens");



async function createChat(req,res){
    const contactUsername = req.body.username
	const currentUsername = extractUserName(req)
    const temp = await ChatsServices.createChat(currentUsername, contactUsername)
    const response = await responseChat.createChat(temp)
    res.status(response.status).send(response.body)
	if(200 === response.status){
		const usersToUpdate = [response.body.user.username]
        const newChatId = response.body.id
		socketEvents.updateUsersMessage(usersToUpdate, newChatId)
        newContactFirebase(usersToUpdate, contactUsername, newChatId)
	}

}



async function getAllChats(req,res){
    const temp = (await ChatsServices.getAllChats(extractUserName(req)))
    //res.status(temp.status).send(temp.body)
    const response = await responseChat.getAllUsers(temp)
    res.status(response.status).send(response.body)

    //const toRes = await ChatsServices.getAllChats(req.params.username)
    //console.log(toRes)
}



async function getChat(req,res){

    const temp = await ChatsServices.getChat(req.params.id,extractUserName(req))
    const response = await responseChat.getChat(temp)
    res.status(response.status).send(response.body)

}

async function deleteChat(req,res){
    const temp = await ChatsServices.deleteChat(req.params.id,extractUserName(req))
    const response = await responseChat.deleteChat(temp)
    res.status(response.status).send(response.body)
}

async function sendMessageToChat(req,res){
	const currentUsername = extractUserName(req)
    const chatId = req.params.id
    const temp  = await ChatsServices.sendMessageToChat(chatId, currentUsername,req.body.msg)
    const response = await responseChat.sendMessageToChat(temp)
    res.status(response.status).send(response.body)
	if(200 === response.status){
		const chat = await ChatsServices.getChat(chatId, currentUsername)
		const usersToUpdate = chat.body.users.filter((username) => username !== currentUsername)
		socketEvents.updateUsersMessage(usersToUpdate, chatId)
        newMessageFirebase(usersToUpdate, currentUsername, chatId, response.body)
	}
    //const toRes = await ChatsServices.sendMessageToChat(req.params.chatID,req.params.sender,req.params.content)
    //console.log(toRes)
}
async function getAllMessages(req,res){
    const temp  = await ChatsServices.getAllMessages(req.params.id,extractUserName(req))
    const response = await responseChat.getAllMessages(temp)
    res.status(response.status).send(response.body)
}

module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat, getAllMessages
}