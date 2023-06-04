const debugSockets = false;

class SocketEvents {
  constructor() {
    this.io = undefined;
    this.connectedUsers = [];
  }

  setIO(io) {
    this.io = io;
  }

  setupEvents() {
    this.io.on("connection", (socket) => {
      socket.on("username", ({ username }) => {
        if (debugSockets) {
          console.log("got event username, ", username);
        }
        if (
          this.connectedUsers.length > 0 &&
          this.connectedUsers.find((u) => {
            return u.username === username;
          }) !== undefined
        ) {
          return;
        }
        this.connectedUsers.push({
          id: socket.id,
          username: username,
        });
      });

      socket.on("disconnect", () => {
        const usersCount = this.connectedUsers.length;
        if (debugSockets) {
          console.log("at dissconnect", this.connectedUsers);
        }
        for (let i = 0; i < usersCount; i++) {
          if (debugSockets) {
            console.log("at dissconnect", this.connectedUsers[i]);
          }
          if (this.connectedUsers[i].id === socket.id) {
            this.connectedUsers.splice(i, 1);
            break;
          }
        }
      });
    });
  }
  getIdOfOnlineUsers(users) {
    const usersToUpdate = this.connectedUsers
      .filter((socketUser) => {
        if (users.find((u) => socketUser.username === u) !== undefined) {
          return true;
        }
        return false;
      })
      .map((socketUser) => socketUser.id);
    if (debugSockets) {
      console.log("All online users:", this.connectedUsers);
      console.log("users:", usersToUpdate);
    }
    return usersToUpdate;
  }
  updateUsersMessage(users, chatId) {
    const usersToUpdate = this.getIdOfOnlineUsers(users);
    //user not online
    if (!usersToUpdate) {
      return;
    }
    this.io.to(usersToUpdate).emit("newMessage", {
      chatId: chatId,
    });
  }
  updateUsersChat(users, chatId) {
    const usersToUpdate = this.getIdOfOnlineUsers(users);
    //user not online
    if (!usersToUpdate) {
      return;
    }
    this.io.to(usersToUpdate).emit("newChat", {
      chatId: chatId,
    });
  }
}

const socketEvents = new SocketEvents();

module.exports = socketEvents;
