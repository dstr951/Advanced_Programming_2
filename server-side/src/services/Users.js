const {mongoose} = require('../app')
const {UserPassName} = require('../models/Users')
const checkParams = require("./checkParams")
/*
todo-
GET: api/Users/{username} get information about the current logged-in user (req={username}) (res={code,body{User}})
POST: api/Users register a user (req = {UserPassName}) (res={code, body{User})
 */

async function registerUser(username,password, displayName,profilePic) {
    const newUser = new UserPassName({
        username: username,
        password: password,
        displayName:displayName,
        profilePic: profilePic
    })
    var errors = checkParams({
        username: username,
        password: password,
        displayName:displayName,
        profilePic: profilePic
    },["username","password","displayName","profilePic"])
    if(errors){
        return errors;
    }

    try {
        await newUser.save();
        console.log('User saved successfully:', newUser);
        return {
            status:200,
            body:{
                username:username,
                displayName:displayName,
                profilePic:profilePic
            }
        };

    }
    catch (error){
        console.log(error);
        return {
            title:"conflict",
            status:500
        }
    }

}

async function getUserInfo(username,data) {
    if(data && data.username !== username){
        return {
            status:401,
            body: {title:"Unauthorized",
            status:401}
        };
    }
    try {
        const tempUser = await UserPassName.findOne({ username: username });
        if (tempUser !== null) {
            return {
                status: 200,
                body: {
                    username: tempUser.username,
                    displayName: tempUser.displayName,
                    profilePic: tempUser.profilePic
                }
            };
        } else {
            return {
                status: 401,
                body:{
                    status: 401,
                    title: "Unauthorized",
                }

            };
        }
    } catch (error) {
        return {
            status: 500,
            body: error
        };
    }
}


module.exports = {
        registerUser,
        getUserInfo

};

