const { Router } = require("express");
const ProductsManager = require("../managers/fileSystem/productsManager");

const router = Router();

const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } =
  new ProductsManager();

// Obtiene todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.json({ status: "success", data: products });
  } catch (error) {
    console.error("ERROR in GET /:", error);
    res
      .status(500)
      .json({ status: "error", message: "ERROR interno del servidor" });
  }
});

// Obtiene un producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await getProduct(req.params.pid);
    if (product) {
      res.json({ status: "success", data: product });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("ERROR in GET /:pid: ", error);
    res
      .status(500)
      .json({ status: "error", message: "ERROR interno del servidor" });
  }
});

// Crea un producto
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const products = await createProduct(body);
    res.json({ status: "success", data: products });
  } catch (error) {
    console.error("ERROR in POST /: ", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Actualiza un producto
router.put("/:pid", async (req, res) => {
  try {
    const { body } = req;
    const product = await updateProduct(body, req.params.pid);
    res.json({ status: "success", data: product });
  } catch (error) {
    console.error("ERROR in PUT /:pid: ", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Elimina un producto
router.delete("/:pid", async (req, res) => {
  try {
    const product = await deleteProduct(req.params.pid);
    console.log(product)
    if (product) {
      res.json({ status: "success", data: product });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("ERROR in DELETE /:pid: ", error);
    res
      .status(500)
      .json({ status: "error", message: error.message });
  }
});

module.exports = router;
