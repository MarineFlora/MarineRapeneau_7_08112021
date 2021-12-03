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
exports.modifyPost = async (req, res, next) => {

};

/* ---------- suppression d'une publication ---------- */
exports.deletePost = async (req, res, next) => {

};

/* ---------- récupération de toutes les publications ---------- */
exports.getAllPosts = async (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(404).json({ error }));
};

/* ---------- récupération d'une publication ---------- */
exports.getOnePost = async (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }));
};