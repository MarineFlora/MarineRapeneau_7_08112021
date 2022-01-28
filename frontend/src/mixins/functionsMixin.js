//--------- Fonctions réutilisées ---------// 

import router from '../router/index';

export default {
    methods: {
        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
        },
        // fonctions pour accès aux paramètres modifier/supprimer des posts et commentaires
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
    }   
};