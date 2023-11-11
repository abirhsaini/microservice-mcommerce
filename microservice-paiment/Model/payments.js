const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    idCommande: {
        type: String,
        unique: true
    },
    montant: {
        type: Number,
        required: true
    },
    numeroCarte: {
        type: Number,
        required: true
    }
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;