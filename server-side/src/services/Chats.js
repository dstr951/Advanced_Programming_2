const {mongoose} = require('../app')
const {Message, Chat} = require('../models/Chats')
const {UserPassName} = require("../models/Users");
const {getUserInfo} = require("../services/Users");



/*  GET: api/Chats get list of all chats with logged-in user (from token extract username) req{} res = {code,body{[]}} (req, should automatically send token)(body has- array of Chat objects.)
    return array of chats. if there are no chats return empty array, if error returns null
 */
async function getAllChats(myUsername) {
    const userExists = await getUserInfo(myUsername);
    if(userExists.status !== 200){
        return {
            status:userExists.status
        }
    }
    try {
        const chats = await Chat.find({ users: myUsername });
        const chatList = chats.map((chat) => {
            const user = chat.users.filter((user) => user !== myUsername)[0];
            return {
                id: chat.id,
                user: user,
                messages: chat.messages,
                created:chat.created
            };
        });
        return {
            status: 200,
            body: chatList
        };
    }
    catch (error) {
        console.error('Error retrieving chats:', error);
        return {
            status: 500,
            body: error
        };
    }
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
                username: otherUsername,
                created: chatTemp.created
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
async function getChat(chatID, username) {
    try {
        const chat = await Chat.findOne({ id: chatID, users:username });
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
                return {
                    status: 401,
                    body:{
                        title: "Unauthorized",
                        status: 401
                    }
                        }
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
async function deleteChat(chatID,username) {
    const chatTemp = await getChat(chatID,username); // Await the promise to get the resolved value
    // check if chat exists
    if (chatTemp && chatTemp.status === 200) { // Check if chatTemp is defined before accessing its properties
        try {
            const deleted = await Chat.deleteOne({ id: chatID });
            if (deleted.deletedCount > 0) {
                return {
                    status: 204,
                    body: chatTemp.body
                };
            } else {
                return {
                    status: 404,
                    body:{
                        title: "Not Found",
                        status: 404
                    }
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
            status: 404,
            body:{
                title: "Not Found",
                status: 404
            }
        };
    }
}

/*  POST: api/Chats/{id}/Messages send a message to a specific chat req= {msg:"string"} res={code, body{Message}

 */
async function sendMessageToChat(chatID,sender,content){
    const chatRes = await getChat(chatID,sender);
    //if chat exists
    if(chatRes && chatRes.status === 200 && (chatRes.body.users[0] === sender || chatRes.body.users[1] === sender)) {
        const updatedChat = chatRes.body
        const messageTemp = await addMessage(sender, content)
        //if message was successfully added to db
        if(messageTemp.status === 200){
            updatedChat.messages.push(messageTemp.body.id)


            try{
                await Chat.updateOne({id: chatID}, updatedChat)
                return{
                    status: 200,
                    body: messageTemp.body
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
    catch (error) {
        return {
            status:500,
            body:error
        }
    }

}

async function getAllMessages(chatID,username) {
    const chat = await getChat(chatID,username);
    if (chat.status === 200) {
        const messages = await Promise.all(chat.body.messages.map(async (messageID) => {
            const temp = await Message.findOne({ id: messageID });
            return {
                id: temp.id,
                created:temp.created,
                sender: temp.sender,
                content: temp.content
            };
        }));

        return {
            status: 200,
            body: messages
        };
    } else {
        return {
            status: 401,
            body:{
                title: "Unauthorized",
                status: 401
            }
        };
    }
}



module.exports = {
    createChat,getAllChats,getChat,deleteChat,sendMessageToChat,getAllMessages
};

