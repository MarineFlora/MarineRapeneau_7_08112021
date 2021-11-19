//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------// 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importation config database avec ORM Sequelize
const db = require('../models/index')

// Importation modèle User
const { User } = db.sequelize.models

// fonction pour enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // fonction asynchrone de cryptage du mot de passe 
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // création instance classe User + enregistrement DB
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            })
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

