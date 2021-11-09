//----------------------- fichier contenant l'application Express -----------------------// 

// import Express
const express = require('express');
// import path, donne accès au chemin de notre système de fichier
const path = require('path');
// import fichier config variables env
const config = require('./config/config.js');

//import des router


// création de l'application express
const app = express();

// TEST SERVEUR
app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçue !' }); 
})

// middleware pour résoudre problèmes de CORS et permettre l'accès à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//middleware global, transforme le corps de la requete en objet javascript utilisable
app.use(express.json());

// gestion ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// enregistrement du routeur avec racine attendue par front-end


//export de l'application
module.exports = app;