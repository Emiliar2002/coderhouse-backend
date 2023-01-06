const {Router} = require('express')
const router = Router()
const MockProductService = require('../../services/mock/products/products.mock')
const productService = new MockProductService()



router.get('/', async (req, res, next) => {
    try{
        const {user} = req.session
        if(user){
            req.ttl = 60
        }
        const data = await productService.getFakeProducts()
        if(!data.success) return res.status(500).json({success: false, data})
        res.render('productform', {data, user})
    }catch(e){
        next(e)
    }
})

module.exports = router