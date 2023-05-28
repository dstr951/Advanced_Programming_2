const UserService  = require("../services/Users");




async function registerUser(req,res){
    //res.json( await userService.registerUser(req.username, req.password, req.displayName, req.profilePic))
    const toRes = await UserService.registerUser(
        {username:req.username,
            password:req.password,
            displayName:req.displayName,
            profilePic:req.profilePic})
    console.log(toRes)
}

async function getUserInfo(req,res){
    //res.json( await userService.registerUser(req.username, req.password, req.displayName, req.profilePic))
    const toRes = await UserService.getUserInfo(req.username)
    console.log(toRes)
}

registerUser({username:"tomer5",password:"Asdf1234",displayName:"tomer5", profilePic:"base64"},{})
getUserInfo({username:"tomer1"},{})