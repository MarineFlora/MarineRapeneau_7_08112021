//----------------------- fichier présentant les routes user disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// routes de connexions
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// routes de l'utilisateur
router.get('/user-profile/:userId', userCtrl.getOneUser);
router.put('/user-profile/:userId', auth, userCtrl.modifyInfosUser);
router.delete('/user-profile/:userId', auth, userCtrl.deleteUser);


module.exports = router;