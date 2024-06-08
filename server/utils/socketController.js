

let onlineUsers = [];

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
  return onlineUsers.find(user => user.userId === userId);
}   

const socketController =(io)=>{
    io.on("connection", (socket) => {
        console.log("A client connected");
      
        socket.on("disconnect", () => {
          console.log("A client disconnected");
          removeUser(socket.id);
          io.emit("getUsers", onlineUsers);
        });
      
        socket.on("addUser", (userId) => {
          addUser(userId, socket.id);
          io.emit("getUsers", onlineUsers);
        });
        
        

      
      });
}


module.exports = { addUser, removeUser, getUser };