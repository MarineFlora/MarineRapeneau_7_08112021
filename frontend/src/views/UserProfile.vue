<template>
    <div class="user-profile">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <div class="d-flex align-items-center">
                    <router-link to="/" class="text-dark arrow-link p-1">
                        <b-icon icon="arrow-left" font-scale="1.75" title="retour accueil"></b-icon>
                    </router-link>
                    <h1 class="my-4 mx-2 font-weight-bold">Mon Profil</h1>
                </div>

                <div class="d-flex flex-column align-items-center">
                    <!-- information du profil -->
                    <ProfileImage imageHeight="120" :imageUrl="user.profilePhoto" />
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <p>{{ user.profession }}</p>
                    <p class="py-3">{{ user.userDescription }}</p>

                    <!--edition du profil -->
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-edit-profile class="my-3" />
                    </div>
                    
                    <UserProfileEdit :user="user" :loadUserProfile="loadUserProfile" />
                </div> 

                <div class="d-flex flex-column align-items-end">
                    <!-- lien supprimer le compte -->
                    <b-link class="text-dark" v-b-modal.modal-user-remove> supprimer le compte</b-link>

                    <!-- confirmation de suppression -->
                    <b-modal 
                        id="modal-user-remove" 
                        title="Voulez-vous vraiment supprimer votre profil ?" 
                        hide-footer
                        centered
                    >
                        <p class="mb-5">Réfléchissez bien, le profil sera supprimé définitivement. </p>
                        <div class="d-flex justify-content-end">
                            <b-button 
                                v-b-modal.modal-user-remove-2 
                                variant="primary"
                            >oui, je supprime mon compte</b-button>
                        </div>
                    </b-modal>

                    <b-modal 
                        id="modal-user-remove-2" 
                        title="Toujours sûr de vouloir nous quitter ?" 
                        hide-footer
                        centered
                    >
                        <p class="mb-5">Pour supprimer définitivement votre compte, cliquez sur "supprimer".</p> 
                        <div class="d-flex justify-content-end">
                            <b-button 
                                v-b-modal.modal-user-remove-3 
                                variant="primary" 
                                @click="deleteProfile()"
                            >supprimer</b-button>
                        </div>   
                    </b-modal>

                    <b-modal 
                        id="modal-user-remove-3" 
                        title="A bientôt !" 
                        ok-title="OK" 
                        ok-only
                        @ok="logOut()"
                        centered
                    >
                        <p>Nous vous remercions d'avoir utilisé le réseau social de Groupomania, à bientôt !</p>    
                    </b-modal>

                    <!-- lien changer le mdp ? -->
                    <b-link class="text-dark">changer le mot de passe</b-link>
                </div>

                <!-- Publications de l'user -->
                <h2 class="my-4 mx-2 font-weight-bold">Publications partagées</h2>

            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import ProfileImage from '../components/ProfileImage.vue';
import BaseButton from '../components/BaseButton.vue';
import UserProfileEdit from '../components/UserProfileEdit.vue';

import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';

export default {
    name: 'UserProfile',
    components: {
        TheHeader,
        ProfileImage,
        BaseButton,
        UserProfileEdit 
    }, 
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        this.loadUserProfile();
    },
    methods: {
        loadUserProfile(){
            const userId = localStorage.getItem("userId");
            apiFetch
                .get(`/auth/user-profile/${userId}`)
                .then(data => { 
                    this.user = data.user;
                })
                .catch(error => console.log(error)); 
        }, 
        deleteProfile() {
            apiFetch
                .delete(`/auth/user-profile/${this.user.id}`)
                .then(res => {
                    console.log("delete res:", res)
                })
                .catch(error => {
                    console.log(error)
                }); 
        },
        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
        },     
        
    }
}
</script>

<style lang="scss">
@import "../assets/custom.scss";

.arrow-link:hover {
    background-color: lighten($primary,20%);
    border-radius: 10px;
}

</style>