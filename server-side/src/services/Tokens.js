const {UserPassName} = require("../models/Users")
const checkParams = require("./checkParams")
async function processLogin(username, password) {
    var errors = checkParams({username:username,password:password},["username","password"])
    if(errors){
        return errors
    }
    try {
		console.log(username, password)
        const userExists = await UserPassName.findOne({username: username, password: password})
        if(userExists){
			console.log("In if")
            const data = {username: username}
            // Generate the token.
            const token = jwt.sign(data, key)
            // Return the token to the browser
            return{
                status: 200,
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
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"
function isLoggedIn(req, res, next) {
// If the request has an authorization header
    if (req.headers.authorization) {
// Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
// Verify the token is valid
            const data = jwt.verify(token, key);
            return next()

        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else
        return res.status(401).end();
}

function extractUserName(req) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, key);
    return decodedToken.username

}
module.exports = {processLogin, isLoggedIn, jwt,key, extractUserName}