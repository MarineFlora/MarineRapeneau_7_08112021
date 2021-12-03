//----------------------- configuration pour gerer fichiers entrants dans les requêtes http -----------------------// 

const multer = require('multer');

// object dictionnaire pour faire correspondre l'extension avec le fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// objet de configuration indiquant à multer où et comment enregistrer les fichiers images 
const storage = multer.diskStorage({
    // config destination des fichiers
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // config nom des fichiers
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(' ').join('_').split('.'+extension).join('_');
        callback(null, name + Date.now() + '.' + extension);
    }
});

// exports du multer configuré
module.exports = multer({ storage }).single('image');