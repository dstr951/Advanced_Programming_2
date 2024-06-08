const {UserPassName} = require("../models/Users");
const modelChats = require("../models/Chats")

async function createChat(fromDB){
    if(fromDB.status === 200){
        const user = await UserPassName.findOne({username:fromDB.body.username})
        return{
            status:fromDB.status,
            body:{
                id: fromDB.body.id,
                user: {
                    username: user.username,
                    displayName: user.displayName,
                    profilePic: user.profilePic
                },
                created: fromDB.body.created
            }
        }
    }
    else{
        return {
            status:400,
            body:"No such user or chat with user already exists"
        }
    }
}

async function getAllUsers(fromDB){
    if(fromDB.status !== 200){
        return fromDB
    }
    else{
        var response = { status: 200, body: [] };

        for (const chat of fromDB.body) {
			const user = await UserPassName.findOne({ username:chat.user });
			let lastMessage = await modelChats.Message.findOne({id:Math.max(...chat.messages)})
			if(lastMessage){
				lastMessage = {
					id:lastMessage.id,
					created: lastMessage.created,
					content:lastMessage.content
				}
			}
            response.body.push({
                id: chat.id,
                user: {
                    username:user.username,
                    displayName:user.displayName,
                    profilePic:user.profilePic
                },
                lastMessage: lastMessage,
                created:chat.created
            });
        }
    }

    return response
}

async function getChat(fromDB){
    const response = {status:fromDB.status,body:{id:fromDB.body.id,users:[],messages:[]}}
    if(fromDB.status === 200){
        for(const username of fromDB.body.users){
            console.log(username)
            const user = await getUserFromUsername(username)
            console.log(user)
            response.body.users.push(user)
        }
        for(const messageID of fromDB.body.messages){
            const message = await modelChats.Message.findOne({id: messageID})
            if(message) {
                const sender = await getUserFromUsername(message.sender)
                response.body.messages.push({
                    id: message.id,
                    created: message.created,
                    sender: sender,
                    content: message.content
                })
            }
        }

    }
    else{
        response.status = fromDB.status
        response.body = fromDB.body
    }
    return response
}

async function deleteChat(fromDB){
    if(fromDB.status === 204){
        return {status:fromDB.status, body:undefined}
    }
    else if(fromDB.status === 404){
        return fromDB
    }
    //status === 500 error in db
    else{
        return fromDB
    }
}

async function sendMessageToChat(fromDB){
    if(fromDB.status === 200){
        return{
            status:200,
            body:
                {
                    id: fromDB.body.id,
                    created: fromDB.body.created,
                    sender: await getUserFromUsername(fromDB.body.sender),
                    content: fromDB.body.content
                }
        }
    }
    else if(fromDB.status === 401){
        return  fromDB
    }
    //db error status === 500
    else{
        return  fromDB
    }
}

async function getAllMessages(fromDB){
    if(fromDB.status === 200){
        const promises = Object.keys(fromDB.body).map(message => {
            return getUserFromUsername(fromDB.body[message].sender)
                .then(sender => {
                    fromDB.body[message].sender = sender;
                })
                .catch(error => {
                    // Handle any errors that occur during the promise resolution
                    console.error(error);
                });
        });

        return Promise.all(promises).then(() => {
            // All promises have resolved, return the updated fromDB object
            fromDB.body.sort((a, b) => {
                return a.created - b.created;
            });
            return fromDB
        });
    }
    else{
        return fromDB
    }

}
async function getUserFromUsername(username){
    const user = await UserPassName.findOne({username: username})
    return{
        username:user.username,
        displayName:user.displayName,
        profilePic:user.profilePic
    }
}

module.exports = {
    getAllUsers,
    createChat,
    getChat,
    deleteChat,
    sendMessageToChat,
    getAllMessages
}
