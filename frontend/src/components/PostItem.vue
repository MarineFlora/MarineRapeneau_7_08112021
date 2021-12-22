<template>  
    <div v-if="posts.length">

        <b-card class="my-3 p-0 shadow" v-for="post in posts" :key="post.id">
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
                            <b-dropdown-item href="/about">Signaler</b-dropdown-item>
                        </b-dropdown>

                        <!-- confirmation de suppression -->
                        <b-modal 
                            :id="'modal-' + post.id" 
                            title="Voulez-vous vraiment supprimer ce post ?" 
                            ok-title = "supprimer" 
                            @ok="deletePost(`${post.id}`)"
                        >
                            <p>La publication {{ post.id }} sera supprimée définitivement. </p>
                        </b-modal>

                        <!-- modal de modification du post -->
                        <b-modal 
                            :id="'modal-modify-' + post.id" 
                            title="Modifier la publication" 
                            hide-footer 
                        >
                            <b-form class="col p-2 overflow-hidden" @submit.stop.event="modifyPost(`${post.id}`)">
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
                                    <label for="image-modify" class="my-0 px-2 text-secondary add-media" role="button">modifier/ajouter médias</label>
                                    <input 
                                        type="file" 
                                        id="image-modify"
                                        name="image" 
                                        accept=".jpg, .jpeg, .png, .gif" 
                                        class="input-file-modify"  
                                        @change="updateMediaDisplay"     
                                    >  
                                </div>  
                                <!-- preview img -->
                                <div class="preview-media-modify text-secondary font-italic">
                                    <b-img :src="post.imageUrl" alt="" ></b-img>
                                </div>   

                                <div class="d-flex justify-content-end">
                                    <BaseButton button-title="Modifier" class="btn-sm btn-pages"/> 
                                </div>
                            </b-form>
                        </b-modal>

                    </b-col>
                </b-row>
                <!-- CONTENU PUBLICATION -->
                <b-row>
                    <b-col class="py-3">
                        <b-card-text class="post-content">
                            <div class="d-flex justify-content-center mb-3">
                                <b-img :src="post.imageUrl" alt="" class="post-image" ></b-img>
                            </div>
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

            <!-- COMMENTAIRES liste
            d-none si 0 comments ? -->
            <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
                <PostItemComment />
                <PostItemComment />
            </div>

            <!-- AJOUTER UN COMMENTAIRE -->
            <PostItemCommentCreate />
        
        </b-card>
        
    </div>
    <div v-else>
        <p class="my-4">
            <b-spinner label="Loading..."></b-spinner>
            chargement des publications... 
        </p>
    </div>
    

</template>

<script>
import ProfileImage from './ProfileImage.vue';
import PostItemLike from './PostItemLike.vue';
import PostItemComment from './PostItemComment.vue';
import PostItemCommentCreate from './PostItemCommentCreate.vue';
import BaseButton from './BaseButton.vue';

import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');

export default {
    name: 'PostItem',
    components: {
        ProfileImage,
        PostItemLike,
        PostItemComment,
        PostItemCommentCreate,
        BaseButton
    },
   
    data() {
        return {
            posts: [],
            dayjs: dayjs,
          
        }
    },
    mounted() {
        this.loadPosts();
    },

    methods: {
        loadPosts() {
            apiFetch
                .get("/posts/")
                .then(data => { 
                    this.posts = data.posts;
                    if (data.error) {
                        this.logOut();
                    }
                    console.log("PostItem-this.posts:", this.posts)
                    console.log("error:", data.error)
                })
                .catch(error => {
                    console.log(error)
                    //alert("Une erreur est survenue");
                }); 
        },

        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
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
        // en cours
        modifyPost(id) { 

            const description = document.querySelector(".modify-description").value
            const userId = localStorage.getItem("userId");

            const selectedFile = document.querySelector(".input-file-modify");
            const image = selectedFile.files[0]

            const isFormData = !!image

            let body = { 
                "userId": Number(userId),
                "description": description
            }
        
            if (isFormData) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("post", JSON.stringify(body))
            body = formData
            }

            apiFetch
                .put('/posts/' + id, body, { isFormData })
                .then(res => {
                    console.log("fetch res:", res)
                    console.log("error fetch:", res.error)
                   // this.loadPosts();
                })
                .catch(error => {
                    console.log("error catch fetch:", error);
                    alert("Une erreur est survenue"); 
                    // Problème
                    // erreur une fois sur 2 si text ou image changée ou les 2...ou aléatoire... 
                    // parfois pas d'alerte
                    // le changement est quand même réalisé et s'affiche sur la page
                    // page se réactualise au lieu de juste composant
                });           
        },
        updateMediaDisplay() {
            const previewMedia = document.querySelector('.preview-media-modify');
            const input = document.querySelector('.input-file-modify');
            while(previewMedia.firstChild) {
                previewMedia.removeChild(previewMedia.firstChild);
            }

            let currentFiles = input.files;
            let filesStatus = document.createElement('p');
            if (currentFiles.length === 0) {
                filesStatus.textContent = 'aucun fichier sélectionné';
                previewMedia.appendChild(filesStatus);
            }/* // si plusieurs fichiers
            else if (currentFiles.length > 4) {
                filesStatus.textContent = 'vous ne pouvez selectionner que 4 images';
                previewMedia.appendChild(filesStatus);
            }*/
            else {
                let list = document.createElement('ul');
                list.style.cssText = 'display:flex; flex-wrap:wrap; list-style:none; margin:0';
                previewMedia.appendChild(list);
                for (let i = 0; i < currentFiles.length; i++) {
                    let listItem = document.createElement('li');
                    listItem.style.margin = '0.6rem';
                    let fileName = document.createElement('p');

                    if (this.validFileType(currentFiles[i])) {
                       fileName.textContent = currentFiles[i].name;
                        let image = document.createElement('img');
                        image.src = window.URL.createObjectURL(currentFiles[i]);
                        listItem.appendChild(image);
                        listItem.appendChild(fileName);
                    } else {
                        fileName.textContent = currentFiles[i].name + ': Format de fichier incorrect. Merci de choisir un format png, jpg, jpeg ou gif.';
                        listItem.appendChild(fileName);
                    }
                    
                    list.appendChild(listItem);
                }
            }
                    
        },
        validFileType(file) {
            const fileTypes = [
            'image/jpeg',
            'image/jpeg',
            'image/png',
            'image/gif'
            ]

            for (let i = 0; i < fileTypes.length; i++) {
                if (file.type === fileTypes[i]) {
                return true;
                }
            }
            return false;
        }
        
    }
}
</script>

<style lang="scss">
.post-content {
    white-space: pre-wrap;
}
.post-image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 25rem;
}

@media (max-width: 576px) {
    .post-image {
        max-height: 20rem;
    }
}

.input-file-modify {
    opacity: 0;
}
</style>