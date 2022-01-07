//----------------------- fichier présentant les routes comments disponibles -----------------------// 

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:postId/comment', auth, multer, commentsCtrl.createComment);
router.put('/:postId/comment/:id', auth, multer, commentsCtrl.modifyComment);
router.delete('/:postId/comment/:id', auth, commentsCtrl.deleteComment);
router.get('/:postId/comments', auth, commentsCtrl.getAllCommentsOfPost);
router.get('/:postId/comment/:id', auth, commentsCtrl.getOneCommentOfPost);

module.exports = router;
