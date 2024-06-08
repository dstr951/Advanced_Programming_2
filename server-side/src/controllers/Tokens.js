const TokenService = require("../services/Tokens")
const FirebaseService = require("../services/FirebaseEvents")

async function processLogin(req, res) {
  const response = TokenService.processLogin(
    req.body.username,
    req.body.password
  )
  if ((await response).status === 200) {
    res.status(200).send((await response).body)
  } else if ((await response).status === 400) {
    res.status((await response).status).send((await response).body)
  } else {
    res.status(404).send("Incorrect username and/or password")
  }
}

function androidLogin(req, res) {
  const {token, username} = req.body
  const result = FirebaseService.loginAndroid(token, username)
  if (200 === result.status) {
    res.status(200).send()
  } else {
    // FirebaseService.androidLogin will not fail for now
  }
}

function androidLogout(req, res) {
  const {token} = req.params
  const result = FirebaseService.logoutAndroid(token)
  if (200 === result.status) {
    res.status(200).send()
  } else {
    res.status(result.status).send(result.body)
  }
}

module.exports = {processLogin, TokenService, androidLogin, androidLogout}
