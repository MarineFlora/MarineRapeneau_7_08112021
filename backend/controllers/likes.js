//----------------------- fichier contenant la logique appliquée à chaque route like -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle User
const { LikePost, LikeComment, Comment } = db.sequelize.models;


/* ---------- LIKE PUBLICATION ---------- */
/* ---------- ajout/suppression d'un like à une publication ---------- */
exports.likeOnePost = async (req, res, next) => {
    try {
        let existingLike = await LikePost.findOne({ where: { userId: req.token.userId, postId: req.params.postId } });
        // si user a déjà liké, supprimer le like
        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: 'vous avez déjà liké ce post, like supprimé!'});
        } 
        // sinon, ajouter le like
        else {
            await LikePost.create({ userId: req.token.userId, postId: req.params.postId });
            res.status(201).json({ message: 'Like ajouté!'});
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

/* ---------- récuperation de tous les likes sur 1 Post ---------- */
exports.getAllLikesOfPost = (req, res, next) => {
    LikePost.findAll({ where: { postId: req.params.postId } , include: db.User })
        .then(likes => res.status(200).json({ likes }))
        .catch(error => res.status(404).json({ error }));
}

/* ---------- récuperation du like d'1 user sur 1 Post ---------- */
exports.getOneLikeOfPost = (req, res, next) => {
    LikePost.findOne({ where: { postId: req.params.postId, userId: req.token.userId } , include: db.User })
        .then(like => res.status(200).json({ like }))
        .catch(error => res.status(404).json({ error }));
}


/* ---------- LIKE COMMENTAIRE ---------- */
/* ---------- ajout/suppression d'un like à un commentaire ---------- */
exports.likeOneComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.commentId, postId: req.params.postId  } }); 
        if (!comment) {
            throw "commentaire inexistant !"
        }

        let existingLike = await LikeComment.findOne({ where: { userId: req.token.userId, postId: req.params.postId, commentId: req.params.commentId } });
        // si user a déjà liké, supprimer le like 
        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: 'vous avez déjà liké ce commentaire, like supprimé!'});
        } 
        // sinon, ajouter le like
        else {
            await LikeComment.create({ userId: req.token.userId, postId: req.params.postId, commentId: req.params.commentId  });
            res.status(201).json({ message: 'Like ajouté!'});
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

/* ---------- récuperation de tous les likes sur 1 Commentaire ---------- */
exports.getAllLikesOfComment = (req, res, next) => {
    LikeComment.findAll({ where: { postId: req.params.postId, commentId: req.params.commentId } , include: db.User })
        .then(likes => res.status(200).json({ likes }))
        .catch(error => res.status(404).json({ error }));
}

/* ---------- récuperation du like d'1 user sur 1 Commentaire ---------- */
exports.getOneLikeOfComment = (req, res, next) => {
        LikeComment.findOne({ where: { postId: req.params.postId, userId: req.token.userId, commentId: req.params.commentId } , include: db.User })
        .then(like => res.status(200).json({ like }))
        .catch(error => res.status(404).json({ error }));
}