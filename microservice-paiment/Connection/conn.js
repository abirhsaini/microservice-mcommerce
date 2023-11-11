const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mcommerce-payment', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecté à la base de données');
    } catch (error) {
        console.error('Erreur de connexion :', error);
        process.exit(1); // Arrête l'application en cas d'erreur de connexion
    }
};

module.exports = connectDB;