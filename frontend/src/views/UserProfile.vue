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
                    <!-- information du profil -->
                    <ProfileImage imageHeight="120" :imageUrl="user.profilePhoto" />
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <p>{{ user.profession }}</p>
                    <p>{{ user.userDescription }}</p>

                    <!--edition du profil -->
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-profile class="my-3" />
                    </div>
                    
                    <UserProfileEdit :user="user" />
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
import UserProfileEdit from '../components/UserProfileEdit.vue';

import { apiFetch } from '../utils/ApiFetch';

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
        editUser(){
             const description = document.querySelector(".modify-description").value
            const userId = localStorage.getItem("userId");
            const previewMedia = document.querySelector('.preview-media-modify');
              
            const selectedFile = document.querySelector(".input-file-modify");
            let images = selectedFile.files 

            if (description === '' && !previewMedia.firstChild) {
                this.loadPosts();
                alert("vous ne pouvez pas envoyer un post vide")
            } else { 
                const isFormData = images.length > 0; 
                let body = { 
                    "userId": Number(userId),
                    "description": description
                }
           
                if (isFormData) {
                    const formData = new FormData();
                    for (let i = 0; i < images.length; i++) {
                        formData.append("image", images[i]);
                    }
                    formData.append("post", JSON.stringify(body))
                    body = formData
                }

                apiFetch
                    .put('/posts/' + id, body, { isFormData })
                    .then(res => {
                        console.log("fetch res:", res)
                        console.log("error fetch:", res.error)
                        this.loadPosts();
                    })
                    .catch(error => {
                        console.log("error catch fetch:", error);
                        alert("Une erreur est survenue"); 
                    });  
            }      
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
</style>