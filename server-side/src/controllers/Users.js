const UserService  = require("../services/Users");
const responseUser = require("../responses/Users")
const TokenService = require("../services/Tokens");
const {extractUserName} = require("../services/Tokens");



async function registerUser(req,res){
    const toSend = await responseUser.registerUser(await UserService.registerUser(
        req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.profilePic))

    res.status(toSend.status).send(toSend.body)
}

async function getUserInfo(req,res){
    const token = req.headers.authorization.split(" ")[1];
    const data = TokenService.jwt.verify(token, TokenService.key);
    const toSend = await UserService.getUserInfo(req.params.username,extractUserName(req));
    res.status(toSend.status).send(toSend.body)
}


module.exports = {
    registerUser,
    getUserInfo

}