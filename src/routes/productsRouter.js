const { Router } = require('express');
const ProductsManager = require('../managers/fileSystem/productsManager');

const router = Router();

const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } = new ProductsManager();

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.send({ status: 'true', data: products });
  } catch (error) {
    console.error(error);
  }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await getProduct(req.params.pid)
        res.send({ status: 'true', data: product });
    } catch (error) {
        console.error(error);
    }
} )

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const products = await createProduct(body);
        res.send({ status: 'true', data: products });
    } catch (error) {
        console.error(error);
    }
})

router.put('/:pid', async (req, res) => {
  try {
    const { body } = req;
    const products = await updateProduct(body, req.params.pid);
    res.send({ status: 'true', data: products });
  } catch (error) {
    console.error(error);
  }
})

router.delete('/:pid', async (req, res) => {
  try {
    const product = await deleteProduct(req.params.pid);
    res.send({ status: 'true', data: product });
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
