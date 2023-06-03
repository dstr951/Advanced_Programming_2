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
        console.log("at dissconnect", this.connectedUsers);
        for (let i = 0; i < usersCount; i++) {
          console.log("at dissconnect", this.connectedUsers[i]);
          if (this.connectedUsers[i].id === socket.id) {
            this.connectedUsers.splice(i, 1);
            break;
          }
        }
      });
    });
  }
}

const socketEvents = new SocketEvents();

module.exports = socketEvents;
