"use strict";

const io = require("socket.io")();
const eventHandlers = require("./events");
const { newMessage } = require("./events.js");
io.on("connection", (socket) => {
  const connectedClients = () => clients.length;
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
    newMessage(data);
  });
});

module.exports = io;
