//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------// 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importation config database avec ORM Sequelize
const db = require('../models/index')

// Importation modèle User
const { User } = db.sequelize.models

// regex expressions pour valider inputs avant envoi à la base de donnée
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// fonction pour enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // vérifier validation regex mot de passe
    const passwordValue = req.body.password;
   // console.log(passwordRegex.test(passwordValue));
    if ((passwordRegex.test(passwordValue)) == false) {
        res.status(400).json({ error: "le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial"});
    } else {
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
                // puis encodage d'un nouveau token
                .then(user => {
                    res.status(201).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            `${process.env.JWT_KEY}`,
                            { expiresIn: '24h' }
                        )
                    });
                }) 
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    

    }
    
};

// fonction pour connecter les users existants
exports.login = (req, res, next) => {
    if ((passwordRegex.test(req.body.password)) == false || (emailRegex.test(req.body.email)) == false) {
        res.status(400).json({ error: "syntaxe invalide de l'email et/ou du mot de passe" });
    } else {
        User.findOne({ 
            where: { email: req.body.email }
        })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                }
                // on utilise bcrypt pour comparer les hash
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // si false, invalide
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        }
                        // si true, bonne connexion
                        res.status(201).json({
                            userId: user.id,
                            // encodage d'un nouveau token
                            token: jwt.sign(
                                { userId: user.id },
                                `${process.env.JWT_KEY}`,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
};