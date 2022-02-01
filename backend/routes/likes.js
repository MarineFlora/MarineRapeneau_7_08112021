//----------------------- fichier présentant les routes likes disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

// routes like publications
router.post('/:postId/like', auth, likesCtrl.likeOnePost);
router.get('/:postId/likes', auth, likesCtrl.getAllLikesOfPost)
router.get('/:postId/like', auth, likesCtrl.getOneLikeOfPost)

// routes like commentaires
router.post('/:postId/comment/:commentId/like', auth, likesCtrl.likeOneComment);
router.get('/:postId/comment/:commentId/likes', auth, likesCtrl.getAllLikesOfComment)
router.get('/:postId/comment/:commentId/like', auth, likesCtrl.getOneLikeOfComment)

module.exports = router;