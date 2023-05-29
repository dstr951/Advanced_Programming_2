const {UserPassName} = require("../models/Users");

async function getAllUsers(fromDB){
    if(fromDB.status !== 200){
        return fromDB
    }
    else{
        var response = { status: 200, body: [] };

        for (const chat of fromDB.body) {
            const userPromises = chat.users.map(async (username) => {
                const user = await UserPassName.findOne({ username });
                return {
                    username: user.username,
                    displayName: user.displayName,
                    profilePic: user.profilePic,
                };
            });

            const users = await Promise.all(userPromises);

            response.body.push({
                id: chat.id,
                users: users,
            });
        }
    }
    return response
}

module.exports = {
    getAllUsers
}
