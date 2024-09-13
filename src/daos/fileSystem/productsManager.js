const fs = require("fs");
const path = "./data/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
  }

  // Lee productos desde el archivo
  readProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error("ERROR al leer el archivo de productos:", error);
      throw new Error("No se pueden leer los productos");
    }
  };

  // Obtiene todos los productos
  getProducts = async () => {
    try {
      return await this.readProducts();
    } catch (error) {
      console.error("ERROR al obtener productos: ", error);
      throw error;
    }
  };

  // Obtiene un producto por ID
  getProduct = async (productId) => {
    try {
      const products = await this.readProducts();
      return products.find((p) => p.id === productId) || null;
    } catch (error) {
      console.error("ERROR al obtener productos: ", error);
      throw error;
    }
  };

  // Crea un nuevo producto, los campos se pasan por body
  createProduct = async (newProduct) => {
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category",
    ];
    for (const field of requiredFields) {
      if (!newProduct[field]) {
        throw new Error(`Campo faltante: ${field}`);
      }
    }
    try {
      const products = await this.readProducts();
      newProduct.id = Date.now().toString();
      products.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return newProduct;
    } catch (error) {
      console.error("ERROR al crear el producto: ", error);
      throw error;
    }
  };

  // Actualiza un producto
  updateProduct = async (product, productId) => {
    try {
      const products = await this.readProducts();
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }

      const updated = { ...products[productIndex], ...product };
      products[productIndex] = updated;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return updated;
    } catch (error) {
      console.error("ERROR al actualizar el producto: ", error);
      throw error;
    }
  };

  // Elimina un producto por su ID
  deleteProduct = async (productId) => {
    try {
      let products = await this.readProducts();
      const productIndex = products.findIndex((p) => p.id === productId);
        console.log(productIndex)
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      const [productDelete] = products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
      return productDelete;
    } catch (error) {
      console.error("ERROR al eliminar el producto: ", error);
      throw error;
    }
  };
}

module.exports = ProductsManager;
