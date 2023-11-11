const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Produit', productSchema);

module.exports = Product;