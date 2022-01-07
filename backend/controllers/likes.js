//----------------------- fichier contenant la logique appliquée à chaque route like -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle User
const { Post, Like } = db.sequelize.models;


/* ---------- ajout/suppression d'un like à une publication ---------- */
exports.likeOnePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });

        let existingLike = await Like.findOne({ where: { userId: req.token.userId, postId: req.params.postId } });
        // si user a déjà liké, supprimer le like et enlever -1 au total de likes du post
        if (existingLike) {
            await existingLike.destroy();
            await Post.update({ likesCount: post.likesCount -1 }, { where: { id: req.params.postId } });
            res.status(200).json({ message: 'vous avez déjà liké ce post, like supprimé!'});
        } 
        // sinon, ajouter le like et ajouter +1 au total de likes du post
        else {
            await Like.create({ userId: req.token.userId, postId: req.params.postId });
            await Post.update({ likesCount: post.likesCount +1 }, { where: { id: req.params.postId } }); 
            res.status(201).json({ message: 'Like ajouté!'});
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

/* ---------- récuperation de tous les likes sur 1 Post ---------- */
exports.getAllLikesOfPost = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.postId } , include: db.User })
        .then(likes => res.status(200).json({ likes }))
        .catch(error => res.status(404).json({ error }));
}

/* ---------- récuperation du like d'1 user sur 1 Post ---------- */
exports.getOneLikeOfPost = (req, res, next) => {
    Like.findOne({ where: { postId: req.params.postId, userId: req.token.userId } , include: db.User })
        .then(like => res.status(200).json({ like }))
        .catch(error => res.status(404).json({ error }));
}