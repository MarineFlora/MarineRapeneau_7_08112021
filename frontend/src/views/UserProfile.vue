<template>
    <div class="user-profile text-left">
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
                    <ProfileImage imageHeight="120" :imageUrl="user.profilePhoto" />
                    <!-- nom + prénom user -->
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <!-- job -->
                    <p>{{ user.profession }}</p>
                    <!-- description de l'user -->
                    <p>{{ user.userDescription }}</p>
                    <!-- btn editer le profil -->
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-profile class="my-3" />
                    </div>

                    <b-modal 
                        id="modal-profile" 
                        title="Modifier le profil" 
                        ok-title="modifier"
                        cancel-title="annuler"
                        
                        centered
                    >
                        <b-form class="col p-2 overflow-hidden" >
                            <b-form-group class="pb-1">
                                <h6>Image de profil</h6>
                                <ProfileImage imageHeight="60"/>
                            </b-form-group>

                            <b-form-group class="pb-1">
                                <div class="d-flex">
                                    <h6>Prénom</h6>
                                    <b-form-input> </b-form-input>

                                    <h6>Nom</h6>
                                    <b-form-input> </b-form-input>
                                </div>
                            </b-form-group>

                            <b-form-group class="pb-1">
                                <h6>Profession</h6>
                                <b-form-input> </b-form-input>
                            </b-form-group>

                            <b-form-group class="pb-1">
                                <h6>Décrivez-vous en quelques mots</h6>
                                <b-form-textarea rows="1"></b-form-textarea>
                            </b-form-group>
                        </b-form>
                    </b-modal>    
                </div>

                <div class="d-flex flex-column align-items-end">
                    <!-- lien supprimer le compte -->
                    <b-link class="text-dark"> supprimer le compte</b-link>
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

import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'UserProfile',
    components: {
        TheHeader,
        ProfileImage,
        BaseButton
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
        loadUserProfile() {
            const userId = localStorage.getItem("userId");
            apiFetch
                .get(`/auth/user-profile/${userId}`)
                .then(data => { 
                    this.user = data.user;
                })
                .catch(error => console.log(error)); 
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