const {mongoose} = require('../app')
const {Message, Chat} = require('../models/Chats')

/*
    todo add functionality for
    -GET: api/Chats/{id}/Messages use web socket to get incoming messages content req{} res={code, bod{yMessage}

 */

/*  GET: api/Chats get list of all chats with logged-in user (from token extract username) req{} res = {code,body{[]}} (req, should automatically send token)(body has- array of Chat objects.)
    return array of chats. if there are no chats return empty array, if error returns null
 */
async function getAllChats(myUsername){
    let chatList = [];
    return Chat.find({ users: myUsername })
        .then(chats => {
            chats.map(chat => {
                if (chat) {
                    chatList.push({ id: chat.id, users: chat.users, messages: chat.messages });
                }
            });
            return chatList;
        })
        .then(result => {
            console.log('Chat List:', result);
            return result;
        })
        .catch(error => {
            console.error('Error retrieving chats:', error);
            return null
        });
}

/*  POST: api/Chats add a chat with a specific user req={username} res = {code, body{id, User}}
    add a chat. gets 2 user name, tries to add to Chat scheme. if successful returns a chat object of
 */
async function createChat(myUsername, otherUsername){
    const chatTemp = new Chat({
        users: [myUsername,otherUsername]
    })
    try{
        await chatTemp.save()

        return {
            status:200,
            body:{
                id: chatTemp.id,
                users: [chatTemp.users[0],chatTemp.users[1]],
                messages: chatTemp.messages
            }
        };
    }
    catch (e) {
        console.log(e)
        return {
            status:500,
            body:e
        }
    }

}

/*  GET: api/Chats/{id} get a specific chat with a user using the chatID req={id}, res={code,body{id,users[],messages[]}}(array of type User, array of type Message )
    return if chat exists {status,body-Chat} else if chat doesn't exist returns {status}, if there is an error returns {status,body-error}
 */
async function getChat(chatID) {
    try {
        const chat = await Chat.findOne({ id: chatID });
        if (chat) {
            return {
            status: 200,
            body:{id: chat.id,
                users: chat.users,
                messages: chat.messages
                }
            };
        }
        else{
            {
                return {status: 404}
            }
        }
    } catch (error) {

        return {
            status: 500,
            body:error
        };
    }
}

/*  DELETE: api/Chats/{id} delete specific chat with a user using the chatID req{} res{code,body{}}
    if chat exist and no error accured, return status 200 and body Chat, if error return status 500 and body Chat, else,
     chat doesn't exist and return status 404
 */
async function deleteChat(chatID) {
    const chatTemp = await getChat(chatID); // Await the promise to get the resolved value
    // check if chat exists
    if (chatTemp && chatTemp.status === 200) { // Check if chatTemp is defined before accessing its properties
        try {
            const deleted = await Chat.deleteOne({ id: chatID });
            if (deleted.deletedCount > 0) {
                return {
                    status: 200,
                    body: chatTemp.body
                };
            } else {
                return {
                    status: 404
                };
            }
        } catch (error) {
            return {
                status: 500,
                body: error
            };
        }
    } else {
        return {
            status: 404
        };
    }
}

/*  POST: api/Chats/{id}/Messages send a message to a specific chat req= {msg:"string"} res={code, body{Message}

 */
async function sendMessageToChat(chatID,sender,content){
    const chatRes = await getChat(chatID);
    //if chat exists
    if(chatRes && chatRes.status === 200) {
        const updatedChat = chatRes.body
        const messageTemp = await addMessage(sender, content)
        //if message was successfully added to db
        if(messageTemp.status === 200){
            updatedChat.messages.push(messageTemp.body.id)

            try{
                Chat.updateOne({id: chatID}, updatedChat).then((r)=>{
                    console.log(r);
                })
                return{
                    status: 200,
                    body: updatedChat
                }
            }
            catch (error) {
                return {
                    status:500,
                    body:error
                }
            }

        }
        else{
            return {
                status:messageTemp.status,
                body: messageTemp.body
            }

        }

    }
    else{
        return {
            status: chatRes.status,
            body: chatRes.body
        }
    }
}

async function addMessage(sender,message){
    const messageTemp = new Message({
        sender: sender,
        content: message
    })
    try{
        await messageTemp.save()
        const message = {
            id: messageTemp.id,
            created: messageTemp.created,
            sender: messageTemp.sender,
            content: messageTemp.content
        }
        return {
            status:200,
            body: message
        };
    }
    catch (e) {
        return {
            status:500,
            body:e
        }
    }

}

module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat
};

