const {Router} = require('express')
const router = Router()

const productosRouter = require('./productos/productos.router')
const carritoRouter = require('./carrito/carrito.router')
const productosTestRouter = require('./productos-test/productos-test.router')
const authRouter = require('./auth/auth.router')

require('dotenv').config()

router
.use('/productos', productosRouter)
.use('/carrito', carritoRouter)
.use('/productos-test', productosTestRouter)
.use('/auth', authRouter)
.all('/*', (req, res) => {
    const {method, originalUrl} = req
    res.status(404).json({
        error: 'Not found',
        data: `${method} ${originalUrl} not implemented.`
    })
})


module.exports = router