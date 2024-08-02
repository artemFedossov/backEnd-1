const fs = require("fs");
const path = "./data/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
  }

  readProducts = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      return products;
    }
    return [];
  };

  getProducts = async () => {
    try {
      const products = await this.readProducts();
      return products;
    } catch (error) {
      console.error(error);
    }
  };

  getProduct = async (productId) => {
    const products = await this.readProducts();
    const product = products.find((p) => p.id === productId);
    if (product) {
      return product;
    }

    return [];
  };

  createProduct = async (newProduct) => {
    try {
      const products = await this.readProducts();
      newProduct.id = Date.now().toString();
      products.push(newProduct);
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (product, productId) => {
    try {
      const products = await this.readProducts();
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const update = { ...products[productIndex], ...product };
        products[productIndex] = update;
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        return update;
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      let products = await this.readProducts();
      const productDelete = products.find((p) => p.id === productId);
      products = products.filter((p) => p.id !== productId);
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return productDelete;
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = ProductsManager;
