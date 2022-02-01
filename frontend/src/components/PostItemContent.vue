<template>  
    <!-- POST SANS COMMENTAIRES -->
    <div>
        <!-- INFORMATIONS DU COMMENTAIRE ET PARAMETRES -->
        <b-row class="px-3" align-v="center">
            <!-- auteur et date du post -->
            <b-col cols="11" class="px-0" >
                <div class="d-flex align-items-center">
                    
                    <router-link :to="{ name: 'UserProfile', params: { userId: post.User.id } }">
                        <ProfileImage imageHeight="60" :imageUrl="post.User.profilePhoto" :alt="`image de profil de ${post.User.firstName}`" /> 
                    </router-link>
                    <div class="px-3 d-flex align-items-end flex-wrap">
                        <router-link :to="{ name: 'UserProfile', params: { userId: post.User.id } }" style="color: inherit;">
                            <h2 class="pr-2">{{ post.User.firstName }} {{ post.User.lastName }}</h2>
                        </router-link>
                        <p v-if="post.User.admin" class="text-secondary pr-2 d-flex align-items-center">
                            admin
                            <b-icon 
                                icon="person-check-fill" 
                                class="text-dark pl-2" 
                                font-scale="1.5" 
                                title="admin"
                            ></b-icon>
                        </p>
                        <p class="text-secondary pr-2">· {{ dayjs(post.createdAt).locale('fr').fromNow(true) }} </p>
                    </div>
                </div>
            </b-col>

            <!-- paramètres du post -->
            <b-col cols="1" class="px-0 d-flex justify-content-end">
                <b-dropdown 
                    size="sm" 
                    variant="outline-primary" 
                    offset="-160rem"
                    v-b-tooltip.hover.v-primary.left="'paramètres'"
                    :id="'list-params-post' + post.id"
                >
                    <!-- Option 1 : modifier le post -->
                    <b-dropdown-item 
                        v-if="isCreator(post.userId)" 
                        v-b-modal="'modal-modify-' + post.id"
                    > Modifier la publication
                    </b-dropdown-item>
                    <!-- modal de modification du post -->
                    <b-modal 
                        :id="'modal-modify-' + post.id" 
                        title="Modifier la publication" 
                        ok-title="modifier"
                        cancel-title="annuler"
                        @ok="modifyPost(`${post.id}`)"
                        centered
                    >
                        <b-form class="col p-2 overflow-hidden" >
                            <!-- modification contenu -->
                            <b-form-textarea                            
                                rows="2"
                                max-rows="10"
                                v-model="post.description"
                                class="modify-description"
                                title="modifier le post"
                            ></b-form-textarea>
                            
                            <!-- ajout de médias -->
                            <PostInput 
                                labelTitle="modifier médias" 
                                inputImageId="input-image-modify" 
                                inputImageClass="input-file-modify" 
                                previewMedia=".preview-media-modify" 
                                inputFile=".input-file-modify" 
                            />
                            
                            <!-- preview des images -->
                            <div class="preview-media-modify text-secondary font-italic" >
                                <div v-for="value in imageUrl" :key="value">
                                    <b-img :src="value" alt="" class="post-images"></b-img>
                                </div>
                            </div>  
                        </b-form>
                    </b-modal>

                    <!-- Option 2 : supprimer le post -->
                    <b-dropdown-item 
                        v-b-modal="'modal-' + post.id" 
                        v-if="isCreator(post.userId) || isAdmin()" 
                        class="delete-option"
                    > Supprimer la publication
                    </b-dropdown-item>
                    <!-- confirmation de suppression -->
                    <b-modal 
                        :id="'modal-' + post.id" 
                        title="Voulez-vous vraiment supprimer ce post ?" 
                        ok-title="supprimer" 
                        cancel-title= "annuler"
                        @ok="deletePost(`${post.id}`)"
                        centered
                    >
                        <p>La publication sera supprimée définitivement. </p>
                    </b-modal>

                     <!-- Option 3 : signaler le post -->
                    <b-dropdown-item 
                        v-if="!isCreator(post.userId)" 
                        to="/about"
                        :to="{ name: 'AboutPage', params: { signalToMods: post } }"
                    > Signaler la publication aux modérateurs
                    </b-dropdown-item>
                </b-dropdown> 
            </b-col>
        </b-row>
        
        <!-- CONTENU PUBLICATION -->
        <b-row >
            <b-col class="py-3">
                <b-card-text class="post-content">
                    <!-- disposition des images selon leur nombre -->
                    <PostItemImagesDisplay :post="post" v-if="imageUrl.length > 0"/>

                    <p class="text-break text-left">{{ post.description }}</p>
                </b-card-text> 
            </b-col>   
        </b-row>

    </div> 

</template>

<script>
import ProfileImage from './ProfileImage.vue';
import PostItemImagesDisplay from './PostItemImagesDisplay.vue';
import PostInput from '../components/PostInput.vue';

import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');
import functionsMixin from '../mixins/functionsMixin.js'

export default {
    name: 'PostItemContent',
    components: {
        ProfileImage,
        PostItemImagesDisplay,
        PostInput
    },
    props: {
        post: { type: Object, default: ['post'] },
        loadPosts: { type: Function },
    },
    data() {
        return {
            dayjs: dayjs,
            imageUrl: JSON.parse(this.post.imageUrl),
            userData: JSON.parse(localStorage.getItem("userData")),
        }
    },
    mixins: [functionsMixin],  
    methods: {
        deletePost(id) {
            apiFetch
                .delete("/posts/" + id)
                .then(res => {
                    this.loadPosts();
                })
                .catch(error => {
                    console.log(error)
                }); 
        },
        modifyPost(id) { 
            const description = document.querySelector(".modify-description").value
            const userId = this.userData.id;
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
                        this.loadPosts();
                    })
                    .catch(error => {
                        console.log(error);
                    });  
            }                      
        },
    }
}
</script>

<style lang="scss">
.post-content {
    white-space: pre-wrap;
}

.preview-media-modify {
    display: flex; 
    flex-wrap: wrap;  
    margin: 0;
}
.post-images {
    width: 100px;
    margin: 0.3rem;
}
</style>