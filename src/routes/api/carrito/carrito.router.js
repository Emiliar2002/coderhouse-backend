const {Router} = require('express');
const router = Router();
const CartService = require("../../../services/carrito/carrito.services");
const cartService = new CartService;
const _ = require('lodash')

router.post("/", async (_req, res, next) => {
  try {
    const data = await cartService.createCart();
    if (!data.success) res.status(500).json(data);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});
  
  router.delete("/:uuid", async (req, res, next) => {
    try {
      const { uuid } = req.params;
      if (_.isNil(uuid))
        return res.status(400).json({ success: false, message: "Req error" });
      const data = await cartService.deleteCart(uuid);
      if (!data.success) return res.status(500).json(data);
      res.status(200).json(data);
    } catch (err) { 
      next(err);
    }
  });
  
  router.get("/:uuid/productos", async (req, res, next) => {
    const { uuid } = req.params;
    try {
      if (_.isNil(uuid))
        return res.status(400).json({ success: false, message: "Req error" });
      const data = await cartService.getCartProducts(uuid);
      if (!data.success) return res.status(500).json(data);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/:uuidCart/productos/:uuidProduct", async (req, res, next) => {
    const { uuidCart, uuidProduct } = req.params;
    try {
      if (_.isNil(uuidCart) || _.isNil(uuidProduct)) return res.status(400).json({ success: false, message: "Req error" });
      const data = await cartService.addProductsToCart(uuidCart, uuidProduct)
      if (!data.success) return res.status(500).json(data);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/:uuidCart/productos/:uuidProduct", async (req, res, next) => {
    const { uuidCart, uuidProduct } = req.params;
    try {
        if (_.isNil(uuidCart) || _.isNil(uuidProduct)) return res.status(400).json({ success: false, message: "Req error" });
      const data = await cartService.removeProductFromCart(uuidCart, uuidProduct);
      if (!data.success) res.status(500).json(data);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;