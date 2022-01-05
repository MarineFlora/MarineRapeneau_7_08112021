//----------------------- fichier présentant les routes likes disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');


router.post('/:id/like', auth, likesCtrl.likeOnePost);

module.exports = router;