const express = require('express');
const productsRouter = require('./src/routes/productsRouter.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
    console.log("Escuchando en el puerto: ", PORT)
})