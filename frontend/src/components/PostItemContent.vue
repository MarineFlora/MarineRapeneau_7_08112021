<template>  
    <!-- POST SANS COMMENTAIRES -->
    <div class="pb-3 border border-left-0 border-top-0 border-right-0">
        <!-- USER + TIME -->
        <b-row class="px-3" align-v="center">
            <b-col cols="11" class="px-0" >
                <div class="d-flex align-items-center">
                    <!-- changer adresse image dynamiquement -->
                    <ProfileImage imageHeight="60" /> 

                    <div class="px-3 d-flex align-items-end flex-wrap">
                        <h2 class="pr-2">{{ post.User.firstName }} {{ post.User.lastName }}</h2>
                        <div class="text-secondary pr-2 d-flex align-items-end">
                            <p v-if="post.User.admin">
                                admin
                                <b-icon icon="person-check-fill" class="text-dark pl-2" font-scale="1.5" title="admin"></b-icon>
                            </p>
                        </div>
                        <p class="text-secondary pr-2">· {{ dayjs(post.createdAt).locale('fr').fromNow() }} </p>
                    </div>
                </div>
            </b-col>
            <b-col cols="1" class="px-0 d-flex justify-content-end">
                <!-- paramètres du post -->
                <b-dropdown size="sm" variant="outline-primary" offset="-130rem" v-b-tooltip.hover.v-primary.left="'paramètres'">
                    <b-dropdown-item v-if="isCreator(post.userId)" v-b-modal="'modal-modify-' +  post.id">Modifier</b-dropdown-item>
                    <b-dropdown-item v-b-modal="'modal-' +  post.id" v-if="isCreator(post.userId) || isAdmin()" class="delete-option">Supprimer</b-dropdown-item>
                    <b-dropdown-item to="/about">
                    Signaler</b-dropdown-item>
                </b-dropdown>

                <!-- modal de modification du post -->
                <b-modal 
                    :id="'modal-modify-' + post.id" 
                    title="Modifier la publication" 
                    ok-title="modifier"
                    cancel-title="annuler"
                    @ok="modifyPost(`${post.id}`)"
                >
                    <b-form class="col p-2 overflow-hidden" >
                        <!-- modif description -->
                        <b-form-textarea                            
                            rows="2"
                            max-rows="10"
                            v-model="post.description"
                            class="modify-description"
                        ></b-form-textarea>
                        <!-- input file -->
                        <div class="d-flex align-items-center justify-content-start px-0 overflow-hidden mt-3" title="ajouter une image ou un gif">
                            <b-icon icon="images" class="text-primary"></b-icon>
                            <label for="image-modify" class="my-0 px-2 text-secondary add-media text-nowrap" role="button">modifier médias</label>
                            <input 
                                type="file" 
                                id="image-modify"
                                name="image" 
                                accept=".jpg, .jpeg, .png, .gif" 
                                class="input-file-modify" 
                                @change="updateMediaDisplay({
                                    preview: '.preview-media-modify',
                                    inputFile: '.input-file-modify',
                                })"  
                                multiple
                            >  
                        </div>    
                        <!-- preview img -->
                        <div class="preview-media-modify text-secondary font-italic" >
                            <div v-for="value in imageUrl" :key="value">
                                <b-img :src="value" alt="" class="modify-img"></b-img>
                            </div>
                        </div>  
                        
                    </b-form>
                </b-modal>

                <!-- confirmation de suppression -->
                <b-modal 
                    :id="'modal-' + post.id" 
                    title="Voulez-vous vraiment supprimer ce post ?" 
                    ok-title="supprimer" 
                    cancel-title= "annuler"
                    @ok="deletePost(`${post.id}`)"
                >
                    <p>La publication sera supprimée définitivement. </p>
                </b-modal>

            </b-col>
        </b-row>
        
        <!-- CONTENU PUBLICATION -->
        <b-row >
            <b-col class="py-3">
                <b-card-text class="post-content">

                    <!-- disposition des images selon leur nombre -->
                    <PostItemImagesDisplay :post="post"/>

                    <p>{{ post.description }}</p>
                </b-card-text> 
            </b-col>   
        </b-row>

        <!-- COMMENTAIRES ET LIKES INFO-->
        <b-row>
            <b-col cols="9" class="d-flex align-items-center">
                <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                <p class="text-secondary mx-2">{{ post.commentsCount }} commentaires</p>
            </b-col>

            <PostItemLike likeScale="1.3"/>
        </b-row>
    </div> 

</template>

<script>
import ProfileImage from './ProfileImage.vue';
import PostItemLike from './PostItemLike.vue';
import BaseButton from './BaseButton.vue';
import PostItemImagesDisplay from './PostItemImagesDisplay.vue';

import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import { mapActions } from 'vuex';

import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');

export default {
    name: 'PostItemContent',
    components: {
        ProfileImage,
        PostItemLike,
        BaseButton,
        PostItemImagesDisplay
    },
    props: {
        post: { type: Object, default: ['post'] },
        loadPosts: { type: Function },
    },
    data() {
        return {
            dayjs: dayjs,
            imageUrl: JSON.parse(this.post.imageUrl)
        }
    },
    methods: {
        // fonctions pour accès aux paramètres modifier/supprimer des posts
        isCreator(option) {
            const userId = localStorage.getItem("userId");
            if (option == userId) {
               return true
            }
        },
        isAdmin() {
            const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            if (isAdmin) {
                return true
            }
        },
        deletePost(id) {
            apiFetch
                .delete("/posts/" + id)
                .then(res => {
                    console.log("delete res:", res)
                    this.loadPosts();
                })
                .catch(error => {
                    console.log(error)
                   // alert("Une erreur est survenue");
                }); 
        },
        modifyPost(id) { 
            const description = document.querySelector(".modify-description").value
            const userId = localStorage.getItem("userId");
            const previewMedia = document.querySelector('.preview-media-modify');
              
            const selectedFile = document.querySelector(".input-file-modify");
            let images = selectedFile.files

            if (description === '' && !previewMedia.firstChild) {
                this.loadPosts();
                alert("vous ne pouvez pas envoyer un post vide")
            } else { 
                const isFormData = !!images

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
        },
        ...mapActions(['updateMediaDisplay']),
    }
}
</script>

<style lang="scss">
.post-content {
    white-space: pre-wrap;
}

.input-file-modify {
    opacity: 0;
}

.preview-media-modify {
    display: flex; 
    flex-wrap: wrap;  
    margin: 0;
}
.modify-img {
    width: 100px;
    margin: 0.3rem;
}
</style>