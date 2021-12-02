//----------------------- fichier contenant la logique appliquée à chaque route post -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index')

// Importation modèle Post
const { Post } = db.sequelize.models

// import file system, accès aux opérations liées au systeme de fichier
const fs = require('fs');

// création d'une publication
exports.createPost = (req, res, next) => {
   
}

