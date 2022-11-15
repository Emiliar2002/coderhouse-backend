require("dotenv").config();

//modulos de node
const _ = require("lodash");

//modulos para el server
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

//creacion del server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//traigo el router
const indexRouter = require("./src/routes/index");

//traigo middlewares
const errorHandler = require("./src/middlewares/errorHandler");
const socket = require('./src/middlewares/socketio')
const morgan = require('morgan')

//aplico middlewares
app.use(morgan('dev'))
app.use(socket(io));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use("/", indexRouter);
app.use(errorHandler);

//seteo view engine y carpeta de views
app.set("views", "./views/pages");
app.set("view engine", "ejs");




//configuracion de los sockets
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



module.exports = server