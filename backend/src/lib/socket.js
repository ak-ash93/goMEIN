import { Server } from "socket.io";
import http from "http";

let io; // define io here

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    io.emit("userList", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user disconnected");
      delete userSocketMap[userId];
      io.emit("userList", Object.keys(userSocketMap));
    });
  });
}

function getReceiverSocketId(userId) {
  return io?.sockets?.adapter?.rooms.get(userId);
}

export { initSocket, getReceiverSocketId };
