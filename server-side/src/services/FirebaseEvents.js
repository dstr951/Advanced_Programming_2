const debugFirebase = false

class FirebaseTokens {
  constructor() {
    this.tokens = []
  }
  addFirebaseToken(token, username) {
    if (debugFirebase) {
      console.log(
        `adding new firebase token, token: ${token}, username: ${username}`
      )
    }
    this.tokens.push({
      token,
      username,
    })
    return {status: 200}
  }
  removeFirebaseToken(token) {
    const oldTokensLength = this.tokens.length
    this.tokens = this.tokens.filter(
      (firebaseToken) => token !== firebaseToken.token
    )
    const newTokensLength = this.tokens.length
    if (oldTokensLength === newTokensLength) {
      if (debugFirebase) {
        console.log(`couldn't find someone with token: ${token}`)
      }
      return {status: 404, body: {message: "couldn't find this token"}}
    }
    if (debugFirebase) {
      console.log(`removed firebase token succesfully, token: ${token}`)
    }
    return {status: 200}
  }
  findTokensWithUsername(username) {
    if (debugFirebase) {
      console.log(`searching for tokens for username: ${username}`)
    }
    tokens = this.tokens
      .filter((firebaseToken) => username === firebaseToken.username)
      .map((firebaseToken) => firebaseToken.token)
    if (debugFirebase) {
      console.log(`result: ${tokens}`)
    }
    return tokens
  }
  //events
  newMessageUpdate(username) {
    if (debugFirebase) {
      console.log(`update new message for username: ${username}`)
    }
  }
  newContactUpdate(username) {
    if (debugFirebase) {
      console.log(`add conversation for username: ${username}`)
    }
  }
}

const firebaseEvents = new FirebaseTokens()

function loginAndroid(token, username) {
  return firebaseEvents.addFirebaseToken(token, username)
}

function logoutAndroid(token) {
  return firebaseEvents.removeFirebaseToken(token)
}

module.exports = {
  loginAndroid,
  logoutAndroid,
}
