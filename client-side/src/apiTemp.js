import {users} from "./db/users"
import {chatUsers} from "./db/chatUsers"
import {chats} from "./db/chats"

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
    body: {userId: user[0].userId},
  }
}
/********************/
/***category register***/
export function userNameExists(userName){
  const sameNameUsers = users.filter(
    u => u.userName === userName
  )
  return sameNameUsers.length > 0
}
export function registerUser(userName, password, displayName, picture){
  if(userNameExists(userName)){
    return {
      code: 409,
      body: "userName already exists"
    }
  }
  const id = users.length + 1
  const newUser = {
    userId: id,
    userName: userName,
    password: password,
    displayName: displayName,
    picture: picture,
  }
  users.push(newUser)
  console.log("the new user id is: "+id)
  return {
    code: 201,
    body: {userId: id}
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
export function getUserStatus(userId) {
  return {
    code: 200,
    body: {status: "online"},
  }
}
export function getUserIdsByUserName(userName){
  //use the toLowerCase fucntion to make include not case sensitive
  const similiarUsers = users.filter(
    u => u.userName.toLowerCase().includes(userName.toLowerCase())
  ).map(
    u => u.userId
  )
  return {
    code: 200,
    body: similiarUsers,
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
  myChats.sort((c1, c2) => {
    return getLastChatMessage(c2.chatId).body.lastMessage.timeSent - getLastChatMessage(c1.chatId).body.lastMessage.timeSent
  })
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
export function sendMessage(messageContent, myId, chatId){
  const message = {
    content: messageContent,
    senderId: myId,
    timeSent: new Date()
  }
  const result = chats.find(e => e.chatId === chatId)?.messages.push(message)
  if(result === undefined){
    return {code: 404};
  }
  return {
    code: 201,
    body: {message: "created"}
  }
}
/********************/
