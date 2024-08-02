const { Router } = require("express");
const CartsManager = require("../managers/fileSystem/cartsManagers");


const router = Router();

const { getCart, getCarts, createCart, updateCart, deleteCart, pushProduct } =
  new CartsManager();

router.get("/", async (req, res) => {
  try {
    const carts = await getCarts();
    res.send({ status: true, dara: carts });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await getCart(req.params.cid);
    res.send({ status: true, data: cart });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await createCart();
    res.send({ status: true, data: cart });
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await pushProduct(req.params.cid, req.params.pid);
    res.send({ status: true, data: cart })
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cart = await deleteCart(req.params.cid);
    res.send({ status: true, data: cart });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
