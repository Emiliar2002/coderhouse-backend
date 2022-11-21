const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const ProductService = require("../../../services/database/products/products.services");
const {isAdmin} = require('../../../controllers/authController')

const productService = new ProductService();

router.get("/", async (_req, res) => {
  try {
    const data = await productService.getProducts();
    if (!data.success) res.status(500).json(data);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { body } = req;
    if (_.isNil(body))
      return res
        .status(400)
        .json({ success: false, data: "REQ ERROR (Missing arguments)" });
    const { name, description, image, price, stock } = body;
    if (
      _.isNil(name) ||
      name.length === 0 ||
      _.isNil(description) ||
      description.length === 0 ||
      _.isNil(image) ||
      image.length === 0 ||
      _.isNil(price) ||
      _.isNil(stock)
    )
      return res
        .status(400)
        .json({ success: false, data: "REQ ERROR (Missing arguments)" });
        if(!parseInt(stock) || !parseInt(price)) return res.status(400).json({success: false, data: "REQ ERROR (Price and stock must be of type INT)"})
    const data = await productService.createProduct(body);
    req.io.sockets.emit("GET_PRODUCTS", {
      ...body,
    });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:code", async (req, res, next) => {
  const { code } = req.params;
  try {
    if (_.isNil(code))
      return res.status(400).json({ success: false, data: "Req error" });
    const data = await productService.getProduct(code);
    if (!data.success) return res.status(500).json(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:code", isAdmin, async (req, res, next) => {
  const { code } = req.params;
  const { body } = req;
  try {
    if (_.isNil(code))
      return res.status(400).json({ success: false, data: "Req error" });
    const data = await productService.updateProduct(code, body);
    if (!data.success) res.status(500).json(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:code", isAdmin, async (req, res, next) => {
  const { code } = req.params;
  try {
    if (_.isNil(code))
      return res.status(400).json({ success: false, data: "Req error" });
    const data = await productService.deleteProduct(code);
    if (!data.success) res.status(500).json(data);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
