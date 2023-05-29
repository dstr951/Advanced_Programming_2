const TokenService = require("../services/Tokens")


async function processLogin(req,res){
    const response = TokenService.processLogin(req.body.username, req.body.password)
    if((await response).status === 201){
        res.status(201).json((await response).body)
    }
    else if((await response).status === 400){
        res.status((await response).status).send((await response).body)
    }
    else {
        res.status(404).send('Incorrect username and/or password')
    }
}

module.exports = {processLogin, TokenService}