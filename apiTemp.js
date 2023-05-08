import {users} from "./db/users"

/***category login***/
export function validateLogin(userName, password) {
  const user = users.filter((u) => u.userName === userName)
  if (user.length === 0) {
    return {code: 401}
  }
  if (user[0].password !== password) {
    return {code: 401}
  }
  return {
    code: 200,
    body: {userId: user.userId},
  }
}
/********************/
/***category register***/
export function registerUser(userName, password, displayName, picture) {
  const id = users.length
  const newUser = {
    userId: id,
    userName: userName,
    password: password,
    displayName: displayName,
    picture: `/face1.png`,
  }
  users.push(newUser)
  return {
    code: 201,
    body: {userId: id},
  }
}
/********************/
/***category users***/
export function getUser(userId) {
  const requestedUser = users.filter((u) => u.userId === userId)
  if (requestedUser.length === 0) {
    return {code: 404}
  }
  const frontUser = {
    userId: requestedUser[0].userId,
    userName: requestedUser[0].userName,
    displayName: requestedUser[0].displayName,
    picture: requestedUser[0].picture,
  }
  return {
    code: 200,
    body: frontUser,
  }
}
function getUserStatus(userId) {
  return {
    code: 200,
    body: {status: "online"},
  }
}
/********************/
/***category chat***/
export function getAllChats(userId){
  const myChats = chatUsers.filter(
    c => (c.user1 === userId || c.user2 === userId)
  ).map(
    c => {
      const user = c.user1 === userId ? c.user2 : c.user1
      return {
        chatId: c.chatId,
        userId: user,
      }
    }
  ) 
  return {
    code: 200,
    body: myChats,
  }
}
export function getChatMessages(chatId){
  const chat = chats.filter(c => c.chatId === chatId)
  if (chat.length === 0) {
    return {code: 404}
  }
  return {
    code: 200,
    body:{messages: chat[0].messages}
  }
}
export function getLastChatMessage(chatId){
  const chat = chats.filter(c => c.chatId === chatId)
  if (chat.length === 0) {
    return {code: 404}
  }
  return {
    code: 200,
    body:{lastMessage: chat[0].messages[chat[0].messages.length -1]}
  }
}
/********************/
