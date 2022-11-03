const express = require('express');
require('dotenv').config()
const app = express()
const indexRouter = require('./src/routes/index')

const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
})