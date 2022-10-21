const { Router } = require("express");
const router = Router();

const productos = [
  {
    name: "Silla",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adam_Nudd-Homeyer_4_Slat_Tappan_Side_Chair_ca_2010s_-present.jpg/1200px-Adam_Nudd-Homeyer_4_Slat_Tappan_Side_Chair_ca_2010s_-present.jpg",
    id: 1,
  },
  {
    name: "Cama",
    image:
      "https://st2.depositphotos.com/1302980/8103/v/600/depositphotos_81034912-stock-illustration-wood-bed-with-green-blanket.jpg",
    id: 2,
  },
  {
    name: "Banqueta",
    image:
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/323/761/products/banqueta-buenos-aires-blanca-21-2d2b91af619c978ecf15951976176892-1024-1024.jpg",
    id: 3,
  },
];

router.get("/", (_req, res) => {
  try {
    return res.status(200).send({ productos });
  } catch (err) {
    return res.status(400).send({
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).send({
        error: "Faltan nombre e imagen en el body.",
      });
    }
    const id = productos[productos.length - 1].id + 1;
    productos.push({
      name,
      image,
      id,
    });
    return res.status(200).send({
      success: `Producto "${name}" creado con el id ${id}!`,
    });
  } catch (err) {
    return res.status(400).send({
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = productos.find((p) => {
      return p.id == id;
    });

    if (!producto)
      return res.status(400).send({ error: "Producto no encontrado." });

    return res.status(200).send(producto);
  } catch (err) {
    return res.status(400).send({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const index = productos.findIndex((p) => {
      if (p.id == id) return true;
    });

    if (index === -1)
      return res.status(400).send({ error: "Producto no encontrado." });

    productos[index].name = name ? name : productos[index].name;
    productos[index].image = image ? image : productos[index].image;

    return res.status(200).send({
      success: "Producto actualizado.",
    });
  } catch (err) {
    return res.status(400).send({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const index = productos.findIndex((p) => {
      if (p.id == id) return true;
    });

    if (index === -1)
      return res.status(400).send({ error: "Producto no encontrado." });

    productos.splice(index, 1)

    return res.status(200).send({
        success: "Producto eliminado.",
      });

  } catch (e) {
    return res.status(400).send({
      error: err.message,
    });
  }
});

module.exports = router;
