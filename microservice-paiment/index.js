const express = require("express");
const connectDB = require("./Connection/conn");
const routes = require("./routes/routes");
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

connectDB();

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use("/payments", routes)


// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur serveur' });
});
app.listen(5002, () => {
    console.log(`Le serveur écoute sur le port 5002`);
});