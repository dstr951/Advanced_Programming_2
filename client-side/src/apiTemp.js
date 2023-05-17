import { users } from "./db/users";
import { chatUsers } from "./db/chatUsers";
import { chats } from "./db/chats";

/***category login***/
export function validateLogin(userName, password) {
  const user = users.filter((u) => u.userName === userName);
  if (user.length === 0) {
    return { code: 401 };
  }
  if (user[0].password !== password) {
    return { code: 401 };
  }
  return {
    code: 200,
    body: { userId: user[0].userId },
  };
}
/********************/
/***category register***/
export function userNameExists(userName) {
  const sameNameUsers = users.filter((u) => u.userName === userName);
  return sameNameUsers.length > 0;
}
export function registerUser(userName, password, displayName, picture) {
  if (userNameExists(userName)) {
    return {
      code: 409,
      body: "userName already exists",
    };
  }
  const id = users.length + 1;
  const newUser = {
    userId: id,
    userName: userName,
    password: password,
    displayName: displayName,
    picture: picture,
  };
  users.push(newUser);
  console.log("the new user id is: " + id);
  return {
    code: 201,
    body: { userId: id },
  };
}
/********************/
/***category users***/
export function getUser(userId) {
  const requestedUser = users.filter((u) => u.userId === userId);
  if (requestedUser.length === 0) {
    return { code: 404 };
  }
  const frontUser = {
    userId: requestedUser[0].userId,
    userName: requestedUser[0].userName,
    displayName: requestedUser[0].displayName,
    picture: requestedUser[0].picture,
  };
  return {
    code: 200,
    body: frontUser,
  };
}
export function getUserStatus(userId) {
  return {
    code: 200,
    body: { status: "online" },
  };
}
export function getUserIdsByUserName(username) {
  const exactUser = users
  .filter((u) => u.userName.toLowerCase() === username.toLowerCase())
  .map((u) => u.userId)
  if(exactUser.length === 1){
	return {
		code: 200,
		body: exactUser,
	}
  }
  //use the toLowerCase fucntion to make include not case sensitive
  let similiarUsers = users
    .filter((u) => u.userName.toLowerCase().includes(username.toLowerCase()))
    .map((u) => u.userId);
  if(similiarUsers.length > 3){
	similiarUsers = similiarUsers.slice(0, 3)
  }
  return {
    code: 200,
    body: similiarUsers,
  };
}
/********************/
/***category chat***/
export function getAllChats(userId) {
  const myChats = chatUsers
    .filter((c) => c.user1 === userId || c.user2 === userId)
    .map((c) => {
      const user = c.user1 === userId ? c.user2 : c.user1;
      return {
        chatId: c.chatId,
        userId: user,
      };
    });
  return {
    code: 200,
    body: myChats,
  };
}
export function getChatMessages(chatId) {
  const chat = chats.filter((c) => c.chatId === chatId);
  if (chat.length === 0) {
    return { code: 404 };
  }
  return {
    code: 200,
    body: { messages: chat[0].messages },
  };
}
export function getLastChatMessage(chatId) {
  const chat = chats.filter((c) => c.chatId === chatId);
  if (chat.length === 0) {
    return { code: 404 };
  }
  return {
    code: 200,
    body: { lastMessage: chat[0].messages[chat[0].messages.length - 1] },
  };
}

export function addContact(myId, userId) {
  const newChatId = chats.length + 1;
  const newChat = {
    chatId: newChatId,
    messages: [
		{
			content:"Hi, I want to start chatting with you",
            senderId: myId,
            timeSent: new Date()
		}
	],
  };
  chats.push(newChat);
  const user1 = Math.min(myId, userId);
  const user2 = Math.max(myId, userId);
  const newChatUsers = {
    user1: user1,
    user2: user2,
    chatId: newChatId,
  };
  chatUsers.unshift(newChatUsers);
  return {
	code: 201,
	body: "created"
  }
}
/********************/
