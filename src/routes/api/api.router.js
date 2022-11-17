const {Router} = require('express')
const router = Router()

const productosRouter = require('./productos/productos.router')
const carritoRouter = require('./carrito/carrito.router')

require('dotenv').config()

router
.use('/productos', productosRouter)
.use('/carrito', carritoRouter)
.all('/*', (req, res) => {
    const {method, originalUrl} = req
    res.status(404).json({
        error: 'Not found',
        data: `${method} ${originalUrl} not implemented.`
    })
})


module.exports = router