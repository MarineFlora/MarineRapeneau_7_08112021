//----------------------- fichier contenant la logique appliquée à chaque route post -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle Post
const { Post } = db.sequelize.models;

// import file system, accès aux opérations liées au systeme de fichier
const fs = require('fs');

/* ---------- création d'une publication ---------- */
exports.createPost = async (req, res, next) => {
    try {
        let postObject = req.body;
        postObject.imageUrl = "[]";
        
        if (req.files && req.files.length != 0) {
            postObject = JSON.parse(req.body.post);
            let imageUrlList = [];
            for (let i = 0; i < req.files.length; i++) {
                let fileUrl;
                fileUrl =`${req.protocol}://${req.get('host')}/images/${req.files[i].filename}`;
                imageUrlList.push(fileUrl);
            }
            postObject.imageUrl = JSON.stringify(imageUrlList)
        } 
        
        // vérifier autorisation avant enregistrement dans la DB
        // si post as JSON (pas d'image), description obligatoire
        if (req.body.description !== "" && postObject.userId === req.token.userId) { 
            let post = await Post.create({ ...postObject });
            // renvoi en réponse détails du Post et de son User
            post = await Post.findOne({ where: { id: post.id }, include: db.User });
            res.status(201).json({ message: 'Publication enregistrée !', post });
        } 

        else {
            throw "création de post non autorisée";
        }

    } catch (error) {
        res.status(400).json({ error });
    }
};

/* ---------- modification d'une publication ---------- */
exports.modifyPost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            let postObject = req.body;

            if (req.files && req.files.length != 0) {
                postObject = JSON.parse(req.body.post);
                // suppression des anciennes images du chemin local
                const oldImageUrlList = JSON.parse(post.imageUrl);
                for (let i = 0; i < oldImageUrlList.length; i++) {
                    const filename = oldImageUrlList[i].split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err => { console.log(err); }  
                    ));
                }
                // ajout des nouveaux fichiers dans le tableau
                let imageUrlList = [];
                for (let i = 0; i < req.files.length; i++) {
                    let fileUrl;
                    fileUrl =`${req.protocol}://${req.get('host')}/images/${req.files[i].filename}`;
                    imageUrlList.push(fileUrl);
                }
                postObject.imageUrl = JSON.stringify(imageUrlList);
            } else {
                postObject.imageUrl = post.imageUrl;
                if (!req.body.description && postObject.imageUrl === "[]") {
                    throw 'vous ne pouvez pas envoyer un post vide'
                } 
            }
            
            // vérifier autorisation avant maj DB
            if (post.userId === req.token.userId) {
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
                const imageUrlList = JSON.parse(post.imageUrl);
                
                // suppression des images du chemin local
                for (let i = 0; i < imageUrlList.length; i++) {
                    const filename = imageUrlList[i].split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err => { console.log(err); }  
                    ));
                }
                // suppression de la publication de la DB
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            
            } else {
                res.status(401).json({ error: "vous n'êtes pas autorisé à supprimer cette publication" });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

/* ---------- récupération de toutes les publications ---------- */
exports.getAllPosts = (req, res, next) => {
    const options = {
        include: db.User,
        order: [['id', 'DESC']]
    }

    if (req.query.userId) {
        options.where = {
            userId: parseInt(req.query.userId)
        }
    }

    Post.findAll(options)
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(404).json({ error }));
};


/* ---------- récupération d'une publication ---------- */
exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } , include: db.User })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }));
};