const {Router} = require('express');
const router = Router();
const MockProductService = require('../../../services/mock/products/products.mock');
const mockProductService = new MockProductService()

router.get('/', async (req, res) => {
    try{

        const data = mockProductService.getFakeProducts()
        if(!data.success) return res.status(500).json({
            success: false,
            data: data.data
        })

        return res.status(200).json({
            ...data
        })
    
        
    }catch(e){
        next(e);
    };
});
module.exports = router;