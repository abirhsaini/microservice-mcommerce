const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    dateCommande: {
        type: Date,
        default: Date.now
    },
    quantite: {
        type: Number,
        required: true
    },
    commandePayee: {
        type: Boolean,
        required: true
    }
});
const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;