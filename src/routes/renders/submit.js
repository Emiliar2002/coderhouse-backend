const {Router} = require('express')
const router = Router()
const ProductService = require('../../services/products/products.services')
const productService = new ProductService()

router.get('/', async (_req, res, next) => {
    try{
        const data = await productService.getProducts()
        if(!data.success) return res.status(500).json({success: false, data})
        res.render('productform', {data})
    }catch(e){
        next(e)
    }
})

module.exports = router