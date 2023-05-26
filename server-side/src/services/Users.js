const {mongoose} = require('../app')
const {User, UserPassName} = require('../models/Users')
/*
todo-
GET: api/Users/{username} get information about the current logged-in user (req={username}) (res={code,body{User}})
POST: api/Users register a user (req = {UserPassName}) (res={code, body{User})
 */

async function registerUser(userPassName) {
    const newUser = new UserPassName({
        username: userPassName.username,
        password: userPassName.password,
        displayName:userPassName.displayName,
        profilePic: userPassName.profilePic
    })
    try {
        await newUser.save();
        console.log('User saved successfully:', newUser);
        return {
            body: {
                status:200
            }
        };

    }
    catch (error){
        console.log(error);
        return {
            title:"conflict",
            status:200
        }
    }
    finally {
         await mongoose.disconnect()
    }
}
