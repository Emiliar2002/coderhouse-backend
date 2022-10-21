const {Router} = require('express')
const router = Router()

const productosRouter = require('./productos/productos.router')

require('dotenv').config()

router.use('/productos', productosRouter)


module.exports = router