const express = require("express");
const handlebars = require('express-handlebars')
const { Server } = require('socket.io');

const productsRouter = require("./routes/productsRouter.js");
const cartsRouter = require("./routes/cartsRouter.js");
const viewsRouter = require('./routes/viewsRouter.js')

const app = express();
const PORT = 8080;

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
app.use("/home", viewsRouter);

// Socket.io
const httpServer = app.listen(PORT, () => {
  console.log("Escuchando en el puerto: ", PORT);
}); 

const io = new Server(httpServer);

io.on('connection', (socket => {
  console.log("Nuevo cliente conectado!");
}))
