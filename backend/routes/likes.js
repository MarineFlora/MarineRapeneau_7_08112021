//----------------------- fichier présentant les routes likes disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

router.post('/:postId/like', auth, likesCtrl.likeOnePost);
router.get('/:postId/likes', auth, likesCtrl.getAllLikesOfPost)
router.get('/:postId/like', auth, likesCtrl.getOneLikeOfPost)

module.exports = router;