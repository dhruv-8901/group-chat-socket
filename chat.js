const io = require("socket.io")();

io.on("connection", async (socket) => {
  socket.on("joinRoom", async (data) => {
    try {
      const { roomId, senderId } = data;

      if (!roomId || !senderId) {
        console.log("in disconnect");
        console.log(`${socket.id} is disconnected`);
        return socket.disconnect();
      }

      socket.join(roomId);
    } catch (error) {
      console.log("in disconnect");
      console.log(`${socket.id} is disconnected`);
      return socket.disconnect();
    }
  });

  socket.on("sendMessage", async (data) => {
    socket.broadcast.to(data.roomId).emit("newMessage", data);
  });

  socket.on("seenMessage", async (data) => {
    // in this based on the message id you need to perform database operations
  });

  socket.on("disconnect", (data) => {
    console.log("Socket disconnect");
  });
});

module.exports = io;
