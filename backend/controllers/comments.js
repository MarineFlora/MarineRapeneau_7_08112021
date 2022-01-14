//----------------------- fichier contenant la logique appliquée à chaque route comments -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle Post
const { Comment, Post } = db.sequelize.models;


/* ---------- création d'un commentaire ---------- */ 
exports.createComment = async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        console.log("req.body", req.body)
        await Comment.create({ ...req.body, postId: req.params.postId, userId: req.token.userId } ) 
        await post.update({ commentsCount: post.commentsCount +1 }, { where: { id: req.params.postId } })
        res.status(201).json({ message: 'Commentaire ajouté!'})
    } catch (error) {
        res.status(400).json({ error });
    }          
}

/* ---------- modification d'un commentaire ---------- */ 
exports.modifyComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.commentId } })
        if (req.token.userId === comment.userId) {
            await comment.update(req.body, { where: { id: req.params.commentId } })
            res.status(200).json({ message: 'Commentaire modifié !'})  
        } else {
            throw "vous n'êtes pas autorisé à modifier ce commentaire" ;
        }
    } catch (error) {
        res.status(400).json({ error });
    }           
}

/* ---------- suppression d'un commentaire ---------- */ 
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.commentId } })
        const post = await Post.findOne({ where: { id: req.params.postId } });

        if (comment.userId === req.token.userId || req.token.isAdmin) {
            await post.update({ commentsCount: post.commentsCount -1 }, { where: { id: req.params.postId } })
            await comment.destroy({ where: { id: req.params.commentId } })
            res.status(200).json({ message: 'Commentaire supprimé !'})
        } else {
           throw "vous n'êtes pas autorisé à supprimer ce commentaire";
        }   
    } catch (error) {
        res.status(400).json({ error });
    }      
}

/* ---------- récupération de tous les commentaires du post---------- */
exports.getAllCommentsOfPost = (req, res, next) => {
    const options = {
        where: { postId: req.params.postId },
        include: db.User,
        order: [['id', 'DESC']]
    }

    if (req.query.limit) {
        options.order = [['id', 'DESC']];
        options.limit = parseInt(req.query.limit);
    }
    console.log("req.query.limit",req.query.limit)
   
    Comment.findAndCountAll(options)
        .then(comments => res.status(200).json({ comments }))
        .catch(error => res.status(404).json({ error }));
}

/* ---------- récupération du commentaire d'un user sur un post ---------- */
exports.getOneCommentOfPost = (req, res, next) => {
    Comment.findOne({ where: { postId: req.params.postId, userId: req.token.userId } , include: db.User })
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(404).json({ error }));
}