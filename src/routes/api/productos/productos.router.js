const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const ProductService = require("../../../services/products/products.services");
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
        .json({ success: false, message: "REQ ERROR (Missing arguments)" });
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
        .json({ success: false, message: "REQ ERROR (Missing arguments)" });
        if(!parseInt(stock) || !parseInt(price)) return res.status(400).json({success: false, message: "REQ ERROR (Price and stock must be of type INT)"})
    Object.assign(body, {
      uuid: uuidv4(),
      timestamp: Date.now(),
    });
    const data = await productService.createProduct(body);
    if (!data.success) return res.status(500).json(data);
    req.io.sockets.emit("GET_PRODUCTS", {
      ...body,
    });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  try {
    if (_.isNil(uuid))
      return res.status(400).json({ success: false, message: "Req error" });
    const data = await productService.getProduct(uuid);
    if (!data.success) return res.status(500).json(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:uuid", isAdmin, async (req, res, next) => {
  const { uuid } = req.params;
  const { body } = req;
  try {
    if (_.isNil(uuid))
      return res.status(400).json({ success: false, message: "Req error" });
    const data = await productService.updateProduct(uuid, body);
    if (!data.success) res.status(500).json(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:uuid", isAdmin, async (req, res, next) => {
  const { uuid } = req.params;
  try {
    if (_.isNil(uuid))
      return res.status(400).json({ success: false, message: "Req error" });
    const data = await productService.deleteProduct(uuid);
    if (!data.success) res.status(500).json(data);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
