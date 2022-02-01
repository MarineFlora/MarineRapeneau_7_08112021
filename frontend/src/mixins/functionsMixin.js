//--------- Fonctions réutilisées ---------// 

import router from '../router/index';

export default {
    methods: {
        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
        },

        // Fonctions pour accès aux paramètres modifier/supprimer des posts et commentaires
        isAdmin() {
            const isAdmin = this.userData.admin;
            if (isAdmin) {
                return true
            }
        },
        isCreator(option) {
            const userId = this.userData.id;
            if (option == userId) {
               return true
            }
        },

        // Fonctions likes post / comment
        // permutation coeurs plein/vide
        likeSwap(condition) {
            if (condition) {
                this.liked = true;
            } else {
                this.liked = false;
            }
        },
    }   
};