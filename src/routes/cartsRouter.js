const { Router } = require("express");
const CartsManager = require("../managers/fileSystem/cartsManagers");

const router = Router();

const { getCart, getCarts, createCart, updateCart, deleteCart, pushProduct } =
  new CartsManager();

// Obtiene todo los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await getCarts();
    res.json({ status: "success", dara: carts });
  } catch (error) {
    console.error("ERROR in GET /: ", error);
    res
      .status(500)
      .json({ status: "error", message: "ERROR interno del servidor" });
  }
});

// Obtiene un carrito por ID
router.get("/:cid", async (req, res) => {
  try {
    const cart = await getCart(req.params.cid);
    if (cart) {
      res.json({ status: "success", data: cart });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("ERROR in GET /:cid: ", error);
    res
      .status(500)
      .json({ status: "error", message: "ERROR interno del servidor" });
  }
});

// Crea un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await createCart();
    res.status(201).json({ status: "success", data: cart });
  } catch (error) {
    console.error("ERROR in POST /: ", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Añade un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await pushProduct(req.params.cid, req.params.pid);
    res.json({ status: "success", data: cart });
  } catch (error) {
    console.error("ERROR in POST /:cid/product/:pid: ", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Elimina un carrito por su ID
router.delete("/:cid", async (req, res) => {
  try {
    const cart = await deleteCart(req.params.cid);
    if (cart) {
      res.json({ status: "success", data: cart });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("ERROR in DELETE /:cid", error);
    res
      .status(500)
      .json({ status: "error", message: error.message });
  }
});

module.exports = router;
