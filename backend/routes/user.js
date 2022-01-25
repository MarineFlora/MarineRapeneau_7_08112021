//----------------------- fichier présentant les routes user disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// import middleware d'authentification et gestion fichiers entrants
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes de connexions
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// routes de l'utilisateur
router.get('/user-profile/:userId', userCtrl.getOneUser);
router.put('/user-profile/:userId', auth, multer, userCtrl.editUser);
router.delete('/user-profile/:userId', auth, userCtrl.deleteUser);
router.put('/user-profile/settings/:userId', auth, userCtrl.changePassword);


module.exports = router;