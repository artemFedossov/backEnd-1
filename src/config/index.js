const { connect } = require('mongoose');

exports.connectDB = async () => {
    console.log("base de datos conectada")
    await connect('mongodb://localhost:27017/baseDatos');
}