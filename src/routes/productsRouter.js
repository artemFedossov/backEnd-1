const { Router } = require('express');
const ProductsManager = require('../managers/fileSystem/productsManager');
const { status } = require('express/lib/response');

const router = Router();

const { getProducts, createProduct, getProduct } = new ProductsManager();

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
        const { body } = req 
        const products = await createProduct(body)
        res.send({ status: 'true', data: products })
    } catch (error) {
        console.error(error)
    }
})



module.exports = router;
