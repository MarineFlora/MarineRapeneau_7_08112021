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
                    <div class="font-weight-bold pt-2">
                        <p class="user-name">{{ user.firstName }} {{ user.lastName }}</p>
                        <p>{{ user.profession }}</p>
                    </div>
                    <p class="py-3">{{ user.userDescription }}</p>

                    <!--edition du profil -->
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-edit-profile class="my-2" />
                    </div>
                    
                    <UserProfileEdit :user="user" :loadUserProfile="loadUserProfile" />
                </div> 

                <div class="d-flex flex-column align-items-end mt-4 mb-5">
                    <div>
                        <b-icon 
                            icon="shield-lock-fill" 
                            font-scale="1.2" 
                        ></b-icon>
                        <b-link class="text-dark pl-1" @click="showAccountParams">Modifier les paramètres du compte</b-link>
                    </div>

                    <!-- lien changer email, password  -->
                    <b-link class="text-dark font-italic" v-show="accountParams">changer votre mot de passe</b-link>

                    <!-- lien supprimer le compte -->
                    <b-link class="text-dark font-italic" v-b-modal.modal-user-remove v-if="accountParams"> supprimer le compte</b-link>

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
                        <p class="mb-5">Il est encore temps de faire marche arrière... <br>
                        Pour supprimer définitivement votre compte, cliquez sur "supprimer".</p> 
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
            user: {},
            userData: JSON.parse(localStorage.getItem("userData")),
            accountParams: false
        }
    },
    mounted() {
        this.loadUserProfile();
    },
    methods: {
        loadUserProfile(){
           const userId = this.userData.id;
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
        showAccountParams() {
            this.accountParams ? this.accountParams = false : this.accountParams = true;
        }   
        
    }
}
</script>

<style lang="scss">
@import "../assets/custom.scss";

.arrow-link:hover {
    background-color: lighten($primary,20%);
    border-radius: 10px;
}

.user-name {
    font-size: 1.3rem;
}

</style>