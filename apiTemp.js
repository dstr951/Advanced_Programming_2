import { users } from "./db/users"

/***category login***/
export function validateLogin(userName, password) {
  const user = users.filter((u) => u.userName === userName)
  if (user.length === 0){
    return {code: 401}
  }
  if(user[0].password !== password){
    return {code: 401}
  }
  return {
    code: 200,
    body: {userId: user.userId}
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
    body: {status: "online"}
  }
}
/********************/

