//----------------------- fichier présentant les routes posts disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

// import middleware d'authentification et gestion fichiers entrants
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes avec action CRUD disponibles, avec leur endpoints, les middleware utilisés et leur fonction

router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);


module.exports = router;