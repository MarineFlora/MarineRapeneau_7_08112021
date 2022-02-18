//----------------------- fichier contenant la logique appliquée à chaque route user -----------------------// 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importation config database avec ORM Sequelize
const db = require('../models/index');
// import file system, accès aux opérations liées au systeme de fichier
const fs = require('fs');

// Importation modèle User
const { User } = db.sequelize.models;

// regex expressions pour valider inputs avant envoi à la base de donnée
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// constante pour renvoyer l'userId et le token pour se connecter
const newToken = user => {
    token = jwt.sign(
        { userId: user.id, isAdmin: user.admin },
        `${process.env.JWT_KEY}`,
        { expiresIn: '24h' }
    )
    return { user, userId: user.id, isAdmin: user.admin, token }
};

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
                    res.status(201).json(newToken(user));
                }) 
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
    
};

// fonction pour connecter les users existants
exports.login = (req, res, next) => {
    if ((passwordRegex.test(req.body.password)) == false || (emailRegex.test(req.body.email)) == false) {
        res.status(400).json({ error: "identifiants incorrects" });
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
                        res.status(201).json(newToken(user));
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
};

// récupérer les information d'un utilsiateur
exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.userId } })
        .then(user => res.status(200).json({ user }))
        .catch(error => res.status(404).json({ error }));
}

// modifier les informations publiques de l'user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (req.token.userId === user.id) {
            let userObject = req.body;
            if (req.body.password) {
                throw "vous ne pouvez pas modifier votre mot de passe ici, retirez le champ password"
            }
            if (req.files) {
                userObject = JSON.parse(req.body.user);
                userObject.profilePhoto = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`;
                // si une image était présente, la supprimer du dossier local
                if (user.profilePhoto) {
                    const oldFilename = user.profilePhoto.split('/images/')[1];
                    fs.unlink(`images/${oldFilename}`, (err => { console.log(err); } ));  
                }
            } 
            
            await user.update({ ...userObject }, { where: { id: req.params.userId } })
            res.status(200).json({ message: 'profil modifié !', user})  
        } else {
            throw "vous n'êtes pas autorisé à modifier ce profil" ;
        }
    } catch (error) {
        res.status(400).json({ error });
    }   
}

// modifier le mot de passe
exports.changePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (req.token.userId === user.id) {
            const passwordDecrypt = await bcrypt.compare(req.body.currentPassword, user.password)
            const newPasswordDecrypt = await bcrypt.compare(req.body.newPassword, user.password)

            if (!passwordDecrypt) {
                return res.status(400).json({ error1: "Mot de passe actuel incorrect !" });
            } 

            else if (newPasswordDecrypt) {
                return res.status(400).json({ error: "Le nouveau mot de passe doit être différent de l'ancien" });
            } 

            else if ((passwordRegex.test(req.body.newPassword)) == false) {
                return res.status(400).json({ error: "le nouveau mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial"});
            } 
            
            else if (req.body.newPassword === req.body.newPasswordConfirm & passwordDecrypt & !newPasswordDecrypt) {
                const hash = await bcrypt.hash(req.body.newPassword, 10);
                await user.update({ password: hash }, { where: { id: req.params.userId } })
                res.status(201).json({ message: 'mot de passe modifié, veuillez vous reconnecter avec votre nouvel identifiant !', user }) 
            }

        } else {
            throw "vous n'êtes pas autorisé à modifier ce profil" ;
        }

    } catch (error) {
        res.status(400).json({ error });
    } 
}

// supprimer l'utilisateur
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (user.id === req.token.userId) {
            if (user.profilePhoto) {
                const oldFilename = user.profilePhoto.split('/images/')[1];
                fs.unlink(`images/${oldFilename}`, (err => { console.log(err); } )); 
            }  
            await user.destroy();
            res.status(200).json({ message: 'profil utilisateur supprimé !'})
        } else {
           throw "vous n'êtes pas autorisé à supprimer cet utilisateur";
        }   
    } catch (error) {
        res.status(400).json({ error });
    } 
}


