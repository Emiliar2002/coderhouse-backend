const express = require('express')
const app = express()
require('dotenv').config()
const Contenedor = require('./contenedor')

const productos = new Contenedor('productos')

const PORT = process.env.PORT || 3000

app.get('/', (_req, res) => {
    return res.status(200)
    .send(`
    <ul>
        <a href="/productos"><li>Productos</li></a>
        <a href="/productoRandom"><li>Producto random</li></a>
        <a href="/productoRandom"><li>ping</li></a>
    </ul>
    `)
})

app.get('/productos', async (_req, res) => {
    const allProducts = await productos.getAll()
    return res.status(200)
    .send({
        productos: allProducts
    })
})

app.get('/productoRandom', async (_req, res) => {
    const allProducts = await productos.getAll()
    const productoRandom = allProducts[Math.floor(Math.random()*allProducts.length)];
    return res.status(200)
    .send({
        productoRandom: productoRandom
    })
})

app.get('/ping', async (_req, res) => {
    return res.status(200)
    .send("<h1>PONG!</h1>")
})

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
})