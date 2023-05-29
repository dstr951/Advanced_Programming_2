const {UserPassName} = require("../models/Users");
const modelChats = require("../models/Chats")

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
    getAllUsers
}
