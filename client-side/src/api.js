const apiPrefix = "http://localhost:5000/api/"

//a solution for the empty body response we get in the api after user was created
//https://github.com/github/fetch/issues/268#issuecomment-176544728
async function myParse(response) {
  const data = await response
    .text()
    .then((text) => (text ? JSON.parse(text) : {}))
  return data
}

export async function registerUser(userName, password, displayName, picture) {
  const newUser = {
    username: userName,
    password: password,
    displayName: displayName,
    profilePic: picture,
  }
  let response = {}
  try {
    response = await fetch(apiPrefix + "Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
  } catch (error) {
    console.error("Error:", error)
  }

  const data = await myParse(response)
  return data
}

export async function validateLogin(userName, password) {
  const userPass = {
    username: userName,
    password: password,
  }
  let response = {}
  try {
    response = await fetch(apiPrefix + "Tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPass),
    })
  } catch (error) {
    console.error("Error:", error)
  }
  return response
}
