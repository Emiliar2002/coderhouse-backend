const {Router} = require('express')
const router = Router()
const productos = require('../api/productos/productosArray')

router.get('/', (_req, res) => {
    res.render('productform', {productos})
})

module.exports = router