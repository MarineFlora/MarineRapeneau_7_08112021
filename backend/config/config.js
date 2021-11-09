//----------------------- fichier utilisant dotenv library pour charger les fichiers .env -----------------------// 

// import de dotenv
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `.env`)
});

// exports pour retrouver les valeurs contenues dans fichier .env
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE_DEV,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE_TEST,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE_PROD,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
