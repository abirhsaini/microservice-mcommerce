const express = require("express");
const Commande = require("../Model/commandes");
const { body, validationResult } = require("express-validator");


const router = express.Router();
const validateCommande = [
    body('commandePayee').isBoolean()
]

router.post("/", validateCommande, async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { productId, quantite, commandePayee } = req.body;
        const commande = new Commande({ productId, quantite, commandePayee });
        const savedCommande = await commande.save();
        res.status(201).json(savedCommande);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
})
router.get('/', async(req, res) => {
    try {
        const orders = await Commande.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/:id', async(req, res) => {
    try {
        const commande = await Commande.findById(req.params.id); // Utilisation de Commande au lieu de Order
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.json(commande); // Utilisation de 'commande' au lieu de 'order'
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.put('/:id', validateCommande, async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!commande) {
            return res.status(404).json({ message: 'Commande non trouvé' });
        }
        res.json(commande);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});






module.exports = router;