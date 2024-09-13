const express = require("express");
const handlebars = require('express-handlebars')
const { Server } = require('socket.io');

const productsRouter = require("./router/api/productsRouter.js");
const cartsRouter = require("./router/api/cartsRouter.js");
const viewsRouter = require('./router/viewsRouter.js');
const ProductsManager = require("./daos/fileSystem/productsManager.js");

const app = express();
const PORT = 8080;
const productManager = new ProductsManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views'); // Configuracion de la carpeta donde debe tomar la plantilla
app.set('views engine', 'handlebars'); // Extencion de las plantillas

// Endpoint
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Socket.io
const httpServer = app.listen(PORT, () => {
  console.log("Escuchando en el puerto: ", PORT);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
  console.log("Nuevo cliente conectado!");

  try {
    const products = await productManager.getProducts();
    socket.emit("products", products)

    socket.on('addProduct', async (product) => {
      await productManager.getProduct(product);
      const updatedProducts = await productManager.getProducts();
      io.emit('products', updatedProducts);
    });

  } catch (error) {
      console.error('Error al manejar la conexión del socket:', error);
  }
})


