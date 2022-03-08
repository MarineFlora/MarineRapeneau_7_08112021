# "Groupomania app" OpenClassrooms Projet 7
# Créez un réseau social d'entreprise
7ème projet du parcours développeur web d'OpenClassrooms

## General Info
But : construire le front-end et back-end du réseau social interne de l'entreprise Groupomania, permettant de faciliter les intéractions entre collègues, grâce notamment à l'échange d'images/gifs/textes.

Contraintes : utilisation d'un framework front-end en Javascript, d'une base de données relationnelles SQL, avec données de connexion sécurisées.

Compétences développées :   
➡ Authentifier un utilisateur et maintenir sa session   
➡ Personnaliser le contenu envoyé à un client web   
➡ Gérer un stockage de données à l'aide de SQL   
➡ Implémenter un stockage de données sécurisé en utilisant SQL   

Status : terminé

## Installation
### 1. Cloner le dépot
Dans votre terminal éxécutez les commandes :
- `git clone https://github.com/MarineFlora/MarineRapeneau_7_08112021.git`
- `cd MarineRapeneau_7_08112021`

### 2. Installer le back-end
Vous devez installer votre système de base de données SQL, et créer la base de donnée.  
Voici un lien pour l'installation de MySQL, utilisé sur ce projet :
https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7152681-installez-le-sgbd-mysql

Dans votre terminal suivez ces étapes :
- Exécutez la commande : `cd backend`
- Créez un dossier images : `mkdir images`
- Installer les dépendances : `npm install` 

- Créez un fichier `.env` et y renseigner les variables d'environnement suivantes pour faire fonctionner l'application :
```
#Selon la configuration de votre base de données :
DB_USERNAME=root (ou nom d'utilisateur)
DB_PASSWORD=mot_de_passe_base_de_données
DATABASE_DEV=nom_base_de_données (ex: groupomania)
DB_HOST=127.0.0.1

#Pour encoder des tokens de connexion sécurisés :
#renseignez une chaine de caratères complexe à la place de RANDOM_TOKEN_SECRET
JWT_KEY=RANDOM_TOKEN_SECRET 
```
- Exécutez la commande `npx sequelize-cli db:migrate`  
Les tables necessaires à l'application sont maintenant ajoutées à votre base de données.
- Exécutez `npx sequelize-cli db:seed:all`  
Un utilisateur Admin a été créé. Pour pourrez modifier les données par défaut après connexion :
```
#Informations de connexion de l'admin
email: 'admin@groupomania.com' 
password: 'Admin-0f-app'
```

L'installation du back-end est terminée !
- Pour lancer le serveur back-end : `node server` 
- Pour le stopper : `Ctrl+C`

### 3. Installer le front-end
Dans votre terminal et depuis le dossier "MarineRapeneau_7_08112021" :
- Exécutez la commande : `cd frontend`
- Puis pour installer les dépendances : `npm install`  
- Pour lancer le serveur front-end : `npm run serve` 
- Pour le stopper : `Ctrl+C`

Bon test !

## Technologies & frameworks utilisés
- Javascript
- Node.js
- Vue.js
- BootstrapVue
- MySQL

## Captures
![capture login gpmania](https://user-images.githubusercontent.com/79592886/157255449-3f996061-4025-4bb5-abad-2ea5fe4e2289.png)
![capture home](https://user-images.githubusercontent.com/79592886/157255562-66a72417-b3dc-4220-b3dd-9e4ad47ef5ba.png)
![capture post-better](https://user-images.githubusercontent.com/79592886/157256539-af8c6bd9-5919-45c9-b5cf-7acea25cb282.png)
![capture profile](https://user-images.githubusercontent.com/79592886/157255615-c26b328c-f85a-4802-ab88-984157ff6958.png)
