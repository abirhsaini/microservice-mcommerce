const axios = require("axios");

const microserviceCommandeProxy = {
    recupererUneCommande: async(id) => {
        try {
            const response = await axios.get(`http://localhost:5001/commandes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la commande:', error);
            throw error;
        }
    },
    updateCommande: async(Commande) => {
        try {
            await axios.put(`http://localhost:5001/commandes/${Commande._id}`, Commande);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la commande:', error);
            throw error;
        }
    },
};

module.exports = microserviceCommandeProxy;