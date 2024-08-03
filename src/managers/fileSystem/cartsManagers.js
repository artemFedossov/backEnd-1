const fs = require("fs");
const path = "./data/carts.json";
const ProductsManager = require("../fileSystem/productsManager");

const productManager = new ProductsManager();

const { readProducts } = productManager;

class CartsManager {
  constructor() {
    this.path = path;
  }

  // Lee los datos de los carritos desde el archivo
  readCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error("ERROR al leer el archivo del carrito", error);
      throw new Error("No se puede leer el carrito");
    }
  };

  // Obtener todos los carritos
  getCarts = async () => {
    try {
      return await this.readCarts();
    } catch (error) {
      console.error("ERROR al obtener los carritos: ", error);
      throw error;
    }
  };

  // Obtener un carrito por ID
  getCart = async (cartId) => {
    try {
      const carts = await this.readCarts();
      return carts.find((c) => c.id === cartId) || null;
    } catch (error) {
      console.error("ERROR al obtener el carrito: ", error);
      throw error;
    }
  };

  // Crea un nuevo carrito
  createCart = async () => {
    try {
      const carts = await this.readCarts();
      const newCart = { id: Date.now().toString(), products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return newCart;
    } catch (error) {
      console.error("ERROR al crear el carrito: ", error);
      throw error;
    }
  };

  // Añade un producto al carrito
  pushProduct = async (cartId, productId) => {
    try {
      const carts = await this.readCarts();
      const products = await readProducts();
      const cart = carts.find((c) => c.id === cartId);
      const product = products.find((p) => p.id === productId);
      if (cart && product) {
        const cartProduct = cart.products.find((p) => p.product === productId);
        if (!cartProduct) {
          cart.products.push({ product: productId, quantity: 1 });
        } else {
          cartProduct.quantity += 1;
        }
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
        return cart;
      } else {
        throw new Error("Carrito o producto no encontrado");
      }
    } catch (error) {
      console.error("ERROR al enviar el producto al carrito: ", error);
      throw error;
    }
  };

  // Elimina un carrito
  deleteCart = async (cartId) => {
    try {
      let carts = await this.readCarts();
      const cartDelete = carts.find((c) => c.id === cartId);

      if (cartDelete) {
        carts = carts.filter((c) => c.id !== cartId);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
        return cartDelete;
      } else {
        throw new Error("Carrito no encontrado");
      }
    } catch (error) {
      console.error("ERROR al eliminar el carrito: ", error);
      throw error;
    }
  };
} // fin CartsManager

module.exports = CartsManager;
