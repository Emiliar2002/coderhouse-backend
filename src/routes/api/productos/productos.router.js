const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const ProductService = require("../../../services/products/products.services");

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

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    if (_.isEmpty(body))
      return res
        .status(400)
        .json({ success: false, message: "REQ ERROR (Body missing)" });
    Object.assign(body, {
      uuid: uuidv4(),
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

router.put("/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  const { body } = req;
  try {
    if (_.isNil(uuid)) return res.status(400).json({ success: false, message: "Req error" });
    const data = await productService.updateProduct(uuid, body);
    if (!data.success) res.status(500).json(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  try {
    if (_.isNil(uuid)) return res.status(400).json({ success: false, message: "Req error" });
    const data = await productService.deleteProduct(uuid);
    if (!data.success) res.status(500).json(data);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
