//----------------------- fichier contenant la logique appliquée à chaque route comments -----------------------// 

// Importation config database avec ORM Sequelize
const db = require('../models/index');

// Importation modèle Post
const { Comment } = db.sequelize.models;

// import file system, accès aux opérations liées au systeme de fichier
const fs = require('fs');

/* ---------- création d'un commentaire ---------- */
exports.createComment = (req, res, next) => {

}

/* ---------- modification d'un commentaire ---------- */
exports.modifyComment = (req, res, next) => {

}

/* ---------- suppression d'un commentaire ---------- */
exports.deleteComment = (req, res, next) => {

}

/* ---------- récupération de tous les commentaires ---------- */
exports.getAllCommentsOfPost = (req, res, next) => {

}

/* ---------- récupération d'un commentaire ---------- */
exports.getOneCommentOfPost = (req, res, next) => {

}