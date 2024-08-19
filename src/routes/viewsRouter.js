const { Router } = require('express');
const ProductsManager = require('../managers/fileSystem/productsManager.js')

const router = Router();
const productsManager = new ProductsManager()

router.get('/', (req, res) => {
    productsManager.getProducts()
        .then(products => {
            res.render('home.handlebars', {
                "Productos": products
            });
        })
})

module.exports = router;