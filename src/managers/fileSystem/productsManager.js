const fs = require('fs');
const path = './data/products.json';

class ProductsManager {
    constructor() {
        this.path = path;
    }

    readProducts = async () => {
       
            if(fs.existsSync(path)){
                const data = await fs.promises.readFile(path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }
       
            
        
        return [];
    }
    getProducts = async () => {
       const products = await this.readProducts()
       return products
    }
    getProduct = async (productId) => {
        const products = await this.readProducts();
        const product = products.find(p => p.id === productId)
        if(product) {
            return product
        }
        else {
            return [];
        }
    }

    createProduct = async newProduct => {
        try {
            const products = await this.readProducts()
            newProduct.id = Date.now().toString();
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
            return newProduct;
        } catch (error) {
            console.error(error)
        }

    }
    updateProduct = async () => {}
    deleteProduct = async () => {}
}    

module.exports = ProductsManager;