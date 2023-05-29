const {UserPassName} = require("../models/Users");
const modelChats = require("../models/Chats")

async function createChat(fromDB){
    if(fromDB.status === 200){
        const user = await UserPassName.findOne({username:fromDB.body.user.username})
        return{
            status:fromDB.status,
            body:{
                id: fromDB.body.id,
                user: {
                    username: user.username,
                    displayName: user.displayName,
                    profilePic: user.profilePic
                }
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
                lastMessage: lastMessage

            });
        }
    }

    return response
}

module.exports = {
    getAllUsers,
    createChat
}
