<template>
    <div>
        <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments" v-if="commentsList.length > 0">
            <!-- 1 COMMENTAIRE -->
            <b-row class="mb-3" align-v="start" v-for="comments in commentsList" :key="comments.id">
                <!-- changer adresse image dynamiquement -->
                <ProfileImage imageHeight="40" />

                <b-col class="px-3">
                    <b-row class="px-3" align-v="center">
                        <b-col cols="11" class="px-0" >
                            <div class="d-flex align-items-end flex-wrap pr-2">
                                <p class="font-weight-bold pr-2">{{ comments.User.firstName }} {{ comments.User.lastName }}</p>
                                <b-icon v-if="comments.User.admin" icon="person-check-fill" class="text-dark px-1" font-scale="1.5" title="admin"></b-icon> 
                                <p class="text-secondary">· {{ dayjs(comments.createdAt).locale('fr').fromNow() }}</p>
                            </div>
                        </b-col>
                        <b-col cols="1" class="px-0 d-flex justify-content-end">

                            <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                            <b-dropdown 
                                size="sm" 
                                variant="link" 
                                offset="-160rem" 
                                no-caret v-b-tooltip.hover.v-primary.left="'paramètres'"
                            >
                                <template #button-content>
                                    <b-icon icon="caret-down-fill" font-scale="0.9"></b-icon>
                                </template>
                            
                                <b-dropdown-item 
                                    v-if="isCreator(comments.userId)" 
                                    v-b-modal="'modal-comment-modify-' + comments.id"
                                > Modifier le commentaire
                                </b-dropdown-item>

                                <b-dropdown-item 
                                    v-if="isCreator(comments.userId) || isAdmin()" 
                                    v-b-modal="'modal-comment-delete' + comments.id"  
                                > Supprimer le commentaire
                                </b-dropdown-item>

                                <b-dropdown-item 
                                    v-if="!isCreator(comments.userId)" 
                                    to="/about"
                                >Signaler le commentaire aux modérateurs
                                </b-dropdown-item>
                            </b-dropdown>

                           
                            <!-- modal de modification du post -->
                            <b-modal 
                                :id="'modal-comment-modify-' + comments.id" 
                                title="Modifier le commentaire" 
                                ok-title="modifier"
                                cancel-title="annuler"
                                @ok="modifyComment(`${comments.id}`)"
                                centered
                            >
                                <b-form class="col p-2 overflow-hidden" >
                                    <!-- modif description -->
                                    <b-form-textarea                            
                                        rows="2"
                                        max-rows="10"
                                        v-model="comments.description"
                                        class="modify-description"
                                    ></b-form-textarea>
                                    
                                </b-form>
                            </b-modal>

                            <!-- confirmation de suppression -->
                            <b-modal 
                                :id="'modal-comment-delete' + comments.id" 
                                title="Voulez-vous vraiment supprimer ce commentaire ?" 
                                ok-title="supprimer" 
                                cancel-title= "annuler"
                                @ok="deleteComment(`${comments.id}`)"
                                centered
                            >
                                <p>Le commentaire sera supprimé définitivement. </p>
                            </b-modal>

                        </b-col>
                    </b-row>

                    <p>{{ comments.description }}</p>

                    <div class="d-flex align-items-center text-secondary mt-1">
                        <b-link class="p-0 text-secondary ">Répondre</b-link>
                        <PostItemCommentLike :post="post" :comments="comments" likeScale="1" class="px-0" />
                    </div>
                </b-col>
            </b-row>
        </div>
            <PostItemCommentCreate :post="post" :loadPostComments="loadPostComments"/>
</div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemCommentLike from '../components/PostItemCommentLike.vue';
import PostItemCommentCreate from '../components/PostItemCommentCreate.vue';
import { apiFetch } from '../utils/ApiFetch';

import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');

export default {
    name: 'PostItemComment',
    components: {
        ProfileImage,
        PostItemCommentLike,
        PostItemCommentCreate
    },
    props: {
        post: { type: Object, default: ['post'] }
    },
    data() {
        return {
            commentsList: [],
            dayjs: dayjs
        }
    },
    mounted() {
        this.loadPostComments();
    },
    methods: {
        loadPostComments() {
            apiFetch
                .get(`/posts/${this.post.id}/comments`)
                .then(data => {
                    this.commentsList = data.comments;
                
                    console.log("PostItem-this.comments:", this.commentsList)
                    console.log("error:", data.error)
                })
                .catch(error => {
                    console.log(error)
                    alert("Une erreur est survenue");
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
        deleteComment(id) {
            apiFetch
                .delete(`/posts/${this.post.id}/comment/` + id)
                .then(res => {
                    console.log("delete res:", res)
                    this.loadPostComments();
                })
                .catch(error => {
                    console.log(error)
                   // alert("Une erreur est survenue");
                }); 
        },
        modifyComment(id) { 
            const description = document.querySelector(".modify-description").value

            if (description === '') {
                alert("vous ne pouvez pas envoyer un commentaire vide")
            } else {  
                let body = { 
                    "description": description
                }

                apiFetch
                    .put(`/posts/${this.post.id}/comment/` + id, body)
                    .then(res => {
                        console.log("modif com res:", res)
                        console.log("error modif com:", res.error)
                        this.loadPostComments();
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
.comments p, .comments a {
    font-size: 0.94rem;
}
</style>