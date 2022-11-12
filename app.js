const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
const indexRouter = require("./src/routes/index");
const _ = require("lodash");

const PORT = process.env.PORT || 3000;

const app = express();
const http = require("http");
const server = http.createServer(app);

const io = new Server(server);

const fs = require("fs");
const errorHandler = require("./src/middlewares/errorHandler");

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

app.set("views", "./views/pages");
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use(errorHandler);

const MessagesService = require("./src/services/messages/messages.services");
const messagesService = new MessagesService();

io.on("connection", async (socket) => {
  const messages = await (await messagesService.getMessages()).data;
  console.log("enviando mensajes a", socket.id);
  messages.forEach((m) => {
    socket.emit("NEW_MESSAGE_FROM_SERVER", m);
  });

  socket.on("NEW_MESSAGE_TO_SERVER", async (message) => {
    const { email, text } = message;
    if (_.isNil(email) || _.isNil(text)) return;

    await messagesService.createMessage(message);
    io.sockets.emit("NEW_MESSAGE_FROM_SERVER", message);
  });
});

server.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
