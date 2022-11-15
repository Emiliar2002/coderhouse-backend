const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

//creacion del server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

module.exports = {app, server, io}