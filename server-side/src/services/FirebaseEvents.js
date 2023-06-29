const {getMessaging} = require("firebase-admin/messaging")

const debugFirebase = false

const EVENTS = {
  NEW_MESSAGE: "NEW_MESSAGE",
  NEW_CONTACT: "NEW_CONTACT",
}

class FirebaseTokens {
  constructor() {
    this.tokens = []
  }
  addFirebaseToken(token, username) {
    const existingToken = this.tokens.filter(
      (firebaseToken) => firebaseToken.token === token
    )
    if (0 > existingToken.length) {
      if (debugFirebase) {
        console.log(
          `token already exists, token: ${token}, username: ${username}`
        )
      }
      return {status: 200}
    }
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
    const tokens = this.tokens
      .filter((firebaseToken) => username === firebaseToken.username)
      .map((firebaseToken) => firebaseToken.token)
    if (debugFirebase) {
      console.log(`result: ${tokens}`)
    }
    return tokens
  }
}

const firebaseEvents = new FirebaseTokens()

function loginAndroid(token, username) {
  return firebaseEvents.addFirebaseToken(token, username)
}

function logoutAndroid(token) {
  return firebaseEvents.removeFirebaseToken(token)
}
function newMessageFirebase(usernames, senderUsername, chatId, messageServer) {
  const tokens = []
  for (username of usernames) {
    const newTokens = firebaseEvents.findTokensWithUsername(username)
    for (token of newTokens) {
      tokens.push(token)
    }
  }
  if (tokens.length === 0) {
    if (debugFirebase) {
      console.log(`there no one to send to`)
    }
    return
  }
  if (debugFirebase) {
    console.log(`sending message to tokens: ${tokens}`)
  }
  for (token of tokens) {
    const message = {
      data: {
        senderUsername: senderUsername,
        chatId: chatId,
        messageContent: messageServer.content,
        event: EVENTS.NEW_MESSAGE,
      },
      token: token,
    }

    getMessaging()
      .send(message)
      .then((response) => {
        console.log(response.successCount + " messages were sent successfully")
      })
  }
}
function newContactFirebase(usernames, contactUsername, chatId) {
  const tokens = []
  for (username of usernames) {
    const newTokens = firebaseEvents.findTokensWithUsername(username)
    for (token of newTokens) {
      tokens.push(token)
    }
  }
  if (tokens.length === 0) {
    if (debugFirebase) {
      console.log(`there no one to send to`)
    }
    return
  }
  if (debugFirebase) {
    console.log(`adding contact to tokens: ${tokens}`)
  }
  for (token of tokens) {
    const message = {
      data: {
        contactUsername: contactUsername,
        chatId: chatId.toString(),
        event: EVENTS.NEW_CONTACT,
      },
      token: token,
    }

    getMessaging()
      .send(message)
      .then((response) => {
        console.log(`contact was added succefully in token: ${token}`)
      })
  }
}

module.exports = {
  loginAndroid,
  logoutAndroid,
  newMessageFirebase,
  newContactFirebase,
}
