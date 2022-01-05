//----------------------- fichier contenant la logique appliquée à chaque route like -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle User
const { Post, Like } = db.sequelize.models;


/* ---------- ajout/suppression d'un like à une publication ---------- */
exports.likeOnePost = async (req, res, next) => {
    try {
        const userIdBody = req.body.userId;
        const post = await Post.findOne({ where: { id: req.params.postId } });

        let existingLike = await Like.findOne({ where: { userId: userIdBody, postId: req.params.postId } });
        // si user a déjà liké, supprimer le like et enlever -1 au total de likes du post
        if (existingLike) {
            await existingLike.destroy();
            await Post.update({ likesCount: post.likesCount -1 }, { where: { id: req.params.postId } });
            res.status(200).json({ message: 'vous avez déjà liké ce post, like supprimé!'});
        } 
        // sinon, ajouter le like et ajouter +1 au total de likes du post
        else {
            await Like.create({ userId: userIdBody, postId: req.params.postId });
            await Post.update({ likesCount: post.likesCount +1 }, { where: { id: req.params.postId } }); 
            res.status(201).json({ message: 'Like ajouté!'});
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};