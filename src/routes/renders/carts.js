const {Router} = require('express');
const CartService = require('../../services/carrito/carrito.services');
const router = Router();
const cartService = new CartService()

router.get('/', async (_req, res) => {
    try{
        const carts = await cartService.getAllCarts()
        res.render('carts', {carts: carts.data})
    }catch(e){
        next(e);
    };

});
module.exports = router;