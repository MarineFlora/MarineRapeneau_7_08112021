//----------------------- fichier contenant la logique appliquée à chaque route like -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle User
const { Post, Like } = db.sequelize.models;


/* ---------- création d'une publication ---------- */
exports.likeOnePost = (req, res, next) => {
 
};