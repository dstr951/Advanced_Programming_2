const {UserPassName} = require("../models/Users")
const Token = require("../app")
//TODO import from app....
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

async function processLogin(username, password) {
    try {
        const userExists = await UserPassName.findOne({username: username, password: password})
        if(userExists){
            const data = {username: username}
            // Generate the token.
            const token = jwt.sign(data, key)
            // Return the token to the browser
            return{
                status: 201,
                body: token
            }
        }
        else{
            return {
                status:404
            }
        }
    } catch (error) {
        console.log(error)
        return {
            status:500,
            body:error
        }

    }
}
module.exports = {processLogin}