const express = require('express');
require('dotenv').config()
const indexRouter = require('./src/routes/index')

const PORT = process.env.PORT || 3000

const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs')
const moment = require('moment')


app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./src/public'))

app.set('views', './views/pages');
app.set('view engine', 'ejs')


app.get('/health', (_req, res) => {
    res.status(200).send({
        success: true,
        environment: process.env.ENV || 'undefined',
        health: 'up'
    })
})

app.use('/', indexRouter)



io.on('connection', socket => {

    
        const messages = JSON.parse(fs.readFileSync('messages.json')).messages
        console.log('enviando mensajes a', socket.id)
        messages.forEach(m => {
            socket.emit('PRINT_MESSAGE', m)
        })


    socket.on('new_message', (message) => {
        const {email, text} = message
        if(!email || !text) return
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        message.date = date
        io.sockets.emit('PRINT_MESSAGE', message)
        const messages = JSON.parse(fs.readFileSync('messages.json'))
        messages.messages.push(message)
        const messagesStringified = JSON.stringify(messages)
        fs.writeFileSync('messages.json', messagesStringified)
    })
})

server.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
})
