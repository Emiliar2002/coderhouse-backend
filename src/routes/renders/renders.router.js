const {Router} = require('express')
const router = Router()

const index = require('./index')
const productForm = require('./submit')

router.use('/', index)
router.use('/submit', productForm)

module.exports = router