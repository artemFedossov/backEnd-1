const { Router } = require('express');
const productsRouter = require("./api/productsRouter.js");
const cartsRouter = require("./api/cartsRouter.js");
const viewsRouter = require('./viewsRouter.js');

const router = Router()

// Endpoint
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/", viewsRouter);

module.exports = router;