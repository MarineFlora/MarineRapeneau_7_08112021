# "Groupomania app" OpenClassrooms Projet 7
# Créez un réseau social d'entreprise
7ème projet du parcours développeur web d'OpenClassrooms

## General Info
But : construire le front-end et back-end du réseau social interne de l'entreprise Groupomania, permettant de faciliter les intéractions entre collègues, grâce notamment à l'échange d'images/gifs/textes.

Contraintes : utilisation d'un framework front-end en Javascript, d'une base de données relationnelles SQL, avec données de connexion sécurisées.

Status : terminé

## Installation
### 1. Cloner le dépot

### 2. Installer le back-end
Vous devez installer votre système de base de données SQL, voici un lien pour l'installation de MySQL, utilisé sur ce projet :
https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7152681-installez-le-sgbd-mysql

Dans votre terminal suivez ces étapes :
- Exécutez la commande : `cd backend`
- Installer les dépendances : `npm install` 
- Créez un dossier images : `mkdir images`

- Créez un fichier `.env` et y renseigner les variables d'environnement suivantes pour faire fonctionner l'application :
Selon la configuration de votre base de donnée :
    - DB_USERNAME=root ou nom d'utilisateur
    - DB_PASSWORD=mot de passe MySQL
    - DATABASE_DEV=groupomania
    - DB_HOST=127.0.0.1

Pour encoder des tokens de connexion sécurisés, renseignez une chaine de caratère complexe à la place de RANDOM_TOKEN_SECRET :
    - JWT_KEY=RANDOM_TOKEN_SECRET 

L'installation du back-end est terminée !
- Pour lancer le serveur back-end local : `node server` 
- Pour stopper le serveur local : `Ctlr+C`

### 3. Installer le front-end
Dans votre terminal :
- Exécutez la commande : `cd frontend`
- Puis pour installer les dépendances : `npm install`  
- Pour lancer le serveur front-end local : `npm run serve` 
- Pour stopper le serveur local : `Ctlr+C`

## Technologies & frameworks utilisés
- Javascript
- Node.js
- Vue.js
- BootstrapVue
- base de donnée SQL : MySQL