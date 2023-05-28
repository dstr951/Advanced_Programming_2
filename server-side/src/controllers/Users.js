const UserService  = require("../services/Users");




async function registerUser(req,res){
    res.json( await UserService.registerUser(
        req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.profilePic))
    //const toRes = await UserService.registerUser(
    //    {username:req.username,
    //        password:req.password,
    //        displayName:req.displayName,
    //        profilePic:req.profilePic})
    //console.log(toRes)
}

async function getUserInfo(req,res){
    res.json(await UserService.getUserInfo(req.params.username))
    //const toRes = await UserService.getUserInfo(req.username)
    //console.log(toRes)
}


module.exports = {
    registerUser,
    getUserInfo

}