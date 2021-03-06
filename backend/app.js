//----------------------- fichier contenant l'application Express -----------------------// 

const express = require('express');
const path = require('path');

//import des routers
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');

const app = express();

// middleware pour résoudre problèmes de CORS et permettre l'accès à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//middleware global, transforme le corps de la requete en objet javascript utilisable
app.use(express.json());

// gestion ressource images
app.use('/images', express.static(path.join(__dirname, 'images')));

// enregistrement du routeur avec racine attendue par front-end
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts', likesRoutes);
app.use('/api/posts', commentsRoutes);

module.exports = app;