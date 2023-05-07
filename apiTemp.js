import { users } from "./db/users"

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

