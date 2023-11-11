const express = require("express");
const Payment = require("../Model/payments");
const { body, validationResult } = require("express-validator");
const microserviceCommandeProxy = require("../Proxies/microserviceCommandeProxy")


const router = express.Router();
const validatePaiement = [
    body('idCommande').isString(),
    body('montant').isNumeric(),
    body('numeroCarte').isNumeric()
];

// Récupérer tous les paiements
router.get('/', async(req, res) => {
    try {
        const paiements = await Payment.find();
        res.json(paiements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Récupérer un paiement par ID
router.get('/:id', async(req, res) => {
    try {
        const paiement = await Payment.findById(req.params.id);
        if (!paiement) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }
        res.json(paiement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


// Mettre à jour un paiement par ID
router.put('/:id', validatePaiement, async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const paiement = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paiement) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }
        res.json(paiement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


// Exemple de fonction pour payer une commande
router.post('/', async(req, res) => {
    try {
        const paiement = req.body;

        // Vérification de l'existence d'un paiement pour cette commande
        const paiementExistant = await Payment.findOne({ idCommande: paiement.idCommande });
        if (paiementExistant) {
            return res.status(400).json({ error: 'Cette commande est déjà payée' });
        }



        // Récupération de la commande correspondante à ce paiement en appelant le microservice commandes via le proxy
        const commande = await microserviceCommandeProxy.recupererUneCommande(paiement.idCommande);

        // Mise à jour de l'objet pour marquer la commande comme payée
        commande.commandePayee = true;

        // Envoi de l'objet de commande mis à jour au microservice commande pour mettre à jour le statut de la commande via le proxy
        await microserviceCommandeProxy.updateCommande(commande);
        // Enregistrement du paiement
        const nouveauPaiement = await Payment.create(paiement);

        // Renvoi de la réponse
        res.status(201).json(nouveauPaiement);
    } catch (error) {
        console.error('Erreur lors du paiement:', error);
        res.status(500).json({ error: 'Erreur lors du paiement, veuillez réessayer ultérieurement' });
    }
});


module.exports = router;