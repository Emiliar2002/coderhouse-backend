const express = require('express');
require('dotenv').config()
const app = express()
const indexRouter = require('./src/routes/index');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./src/public'))

const PORT = process.env.PORT || 3000


app.use('/api', indexRouter)

app.get('/', (_req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
})