const express = require('express');
const Product = require('../Model/produit'); // Assurez-vous que le chemin vers votre modèle est correct
const { body, validationResult } = require('express-validator');

const router = express.Router();
const validateProduct = [
    body('titre').isString(),
    body('description').isString(),
    body('image').isString(),
    body('prix').isNumeric()
];

// Créer un nouveau produit
router.post('/', async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Récupérer tous les produits
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Récupérer un produit par ID
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Mettre à jour un produit par ID
router.put('/:id', async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;