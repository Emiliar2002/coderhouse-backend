const {Router} = require('express')
const router = Router()

const index = require('./index')
const productForm = require('./submit')
const updateForm = require('./updateForm')
const carts = require('./carts')

router.use('/', index)
router.use('/submit', productForm)
router.use('/products/edit', updateForm)
router.use('/carts', carts)

module.exports = router