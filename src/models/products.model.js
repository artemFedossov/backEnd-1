const { Schema, model } = require('mongoose');

const collectionName = 'products'

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true        
    },
    thumbnail: String,
    create: {
        type: Date,
        default: Date.now()
    } 
})

const productModel = model(collectionName, productSchema);

module.exports = {
    productModel
}