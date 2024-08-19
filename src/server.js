const express = require("express");
const productsRouter = require("./routes/productsRouter.js");
const cartsRouter = require("./routes/cartsRouter.js");
const handlebars = require('express-handlebars')
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

app.listen(PORT, () => {
  console.log("Escuchando en el puerto: ", PORT);
});
