const fs = require("fs");
const path = "./data/carts.json";
const ProductsManager = require("../fileSystem/productsManager");

const productManager = new ProductsManager();

const { readProducts } = productManager;

class CartsManager {
  constructor() {
    this.path = path;
  }

  readCarts = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    }
    return [];
  };

  getCarts = async () => {
    try {
      const carts = await this.readCarts();
      return carts;
    } catch (error) {
      console.error(error);
    }
  };

  getCart = async (cartId) => {
    const carts = await this.readCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      return cart;
    }
    return [];
  };

  createCart = async () => {
    try {
      const carts = await this.readCarts();
      const newCart = { id: Date.now().toString(), products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return newCart;
    } catch (error) {
      console.error(error);
    }
  };

  pushProduct = async (cartId, productId) => {
    try {
      const carts = await this.readCarts();
      const products = await readProducts();
      const cart = carts.find((c) => c.id === cartId);
      const product = products.find((p) => p.id === productId);
      if(cart && product){
        const cartProduct = cart.products.find(p => p.product == productId);
        if(!cartProduct) {
            cart.products.push({ product: productId, quantity: 1 });
        }
        else {
            cartProduct.quantity += 1;
        }
      }
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  deleteCart = async (cartId) => {
    try {
      let carts = await this.readCarts();
      const cartDelete = carts.find((c) => c.id === cartId);
      carts = carts.filter((c) => c.id !== cartId);
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return cartDelete;
    } catch (error) {
      console.error(error);
    }
  };

} // fin CartsManager

module.exports = CartsManager;
