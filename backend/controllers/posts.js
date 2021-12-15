//----------------------- fichier contenant la logique appliquée à chaque route post -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle Post
const { Post } = db.sequelize.models;

// import file system, accès aux opérations liées au systeme de fichier
const fs = require('fs');

/* ---------- création d'une publication ---------- */
exports.createPost = async (req, res, next) => {
    let postObject = req.body;
    if (req.file) {
        // reconverti chaine JSON en objet javascript
        postObject = JSON.parse(req.body.post);
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } 

    console.log("req.body.description:", req.body.description);
    console.log("postObject.userId:", postObject.userId);
    console.log("postObject:", postObject);
    console.log("req.body:", req.body);
    console.log("req.token.userId:", req.token.userId)
    // vérifier autorisation avant enregistrement dans la DB
    // si post as JSON (pas d'image), description obligatoire
    if (req.body.description !== "" && postObject.userId === req.token.userId) { 
        try {
            let post = await Post.create({ ...postObject });
            // renvoi en réponse détails du Post et de son User
            post = await Post.findOne({ where: { id: post.id }, include: db.User });
            res.status(201).json({ message: 'Publication enregistrée !', post });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }
    else {
        res.status(401).json({ error: "création de post non autorisée" });
    }
};

/* ---------- modification d'une publication ---------- */
exports.modifyPost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            // on récupère les informations modifiées de la publication
            const postObject = req.file ?
            // traitement si le fichier image existe
            {
                ...JSON.parse(req.body.post), 
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            // sinon on traite les autres élements du corps de la requête
            } : { ...req.body };

            // vérifier autorisation avant maj DB
            if (req.token.userId === post.userId) {
                Post.update({ ...postObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
                    .catch(error => res.status(400).json({ error }));  
            } 
            else {
                res.status(401).json({ error: "vous n'êtes pas autorisé à modifier cette publication" });
            }
        })
        .catch(error => res.status(500).json({ error })); 
};

/* ---------- suppression d'une publication ---------- */
exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            // vérifier autorisation avant suppression DB
            // créateur du post et l'admin peuvent supprimer un post
            if (post.userId === req.token.userId || req.token.isAdmin) {
                const filename = post.imageUrl.split('/images/')[1];
                // suppression de l'image du chemin local puis de la publication de la DB
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                res.status(401).json({ error: "vous n'êtes pas autorisé à supprimer cette publication" });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

/* ---------- récupération de toutes les publications ---------- */
exports.getAllPosts = (req, res, next) => {
    Post.findAll({ include: db.User, order: [ ['id', 'DESC'] ] })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(404).json({ error }));
};

/* ---------- récupération d'une publication ---------- */
exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } , include: db.User })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }));
};