const {Router} = require('express')
const router = Router()

router.get('/', (_req, res) => {
    res.render('productform')
})

module.exports = router