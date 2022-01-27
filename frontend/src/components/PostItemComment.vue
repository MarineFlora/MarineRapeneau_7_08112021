<template>
    <div>
        <!-- COMMENTAIRES ET LIKES INFO -->
        <div class="pb-3 border border-left-0 border-top-0 border-right-0">
            <b-row>
                <b-col cols="9" class="d-flex align-items-center comments-info" @click="targetForm">
                    <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                    <p class="text-secondary mx-2" v-if="post.commentsCount == 0">Commenter</p>
                    <p class="text-secondary mx-2" v-if="post.commentsCount > 1">{{ post.commentsCount }} commentaires</p>
                    <p class="text-secondary mx-2" v-if="post.commentsCount == 1">{{ post.commentsCount }} commentaire</p>
                </b-col>

                <b-col cols="3" >
                    <PostItemLike :post="post" likeScale="1.4"/>
                </b-col>
            </b-row>
        </div> 
        
        <div class="border border-left-0 border-right-0 border-top-0 mt-3" v-if="post.commentsCount > 0">
             <!-- 1 COMMENTAIRE -->
            <div class="mb-3 comments d-flex" align-v="start" v-for="comments in commentsList" :key="comments.id">
            
                <router-link :to="{ name: 'UserProfile', params: { userId: comments.User.id } }">
                    <ProfileImage imageHeight="40" :imageUrl="comments.User.profilePhoto"/>
                </router-link>
                
                <b-col class="pr-0">
                    <b-row class="px-3" align-v="start" >
                        <b-col cols="11" class="px-0" >
                            <div class="d-flex align-items-end flex-wrap pr-2">
                                <router-link :to="{ name: 'UserProfile', params: { userId: comments.User.id } }" style="color: inherit;">
                                    <p class="font-weight-bold pr-2">{{ comments.User.firstName }} {{ comments.User.lastName }}</p>
                                </router-link>
                                <b-icon v-if="comments.User.admin" icon="person-check-fill" class="text-dark px-1" font-scale="1.5" title="admin"></b-icon> 
                                <p class="text-secondary">· {{ dayjs(comments.createdAt).locale('fr').fromNow(true) }}</p>
                            </div>
                        </b-col>
                        <b-col cols="1" class="px-0 d-flex justify-content-end">

                            <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                            <b-dropdown 
                                size="sm" 
                                variant="tertairy" 
                                offset="-160rem" 
                                no-caret v-b-tooltip.hover.v-secondary.left="'paramètres'"
                                class="comment-dropdown"
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
                                    :to="{ name: 'AboutPage', params: { signalToMods: comments, type: 'comment' } }"
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
                    <div class="d-flex align-items-end text-secondary">
                        <p class="comment-text pr-2 text-left">{{ comments.description }}</p>

                        <PostItemCommentLike :post="post" :comments="comments" likeScale="1" />
                    </div>
                </b-col>
            </div>

            <div class="py-2" :class="'other-comments-' + post.id" v-if="post.commentsCount > 2">
                <b-link class="text-secondary mx-2" @click="loadPostComments">afficher {{ post.commentsCount -2 }} autres commentaires</b-link> 
            </div> 
        </div>
         
        <!-- création d'un commentaire -->
        <PostItemCommentCreate :post="post" :loadPostComments="loadPostComments" :key="commentCreateKey"/>
    </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemCommentLike from '../components/PostItemCommentLike.vue';
import PostItemCommentCreate from '../components/PostItemCommentCreate.vue';
import PostItemLike from './PostItemLike.vue';
import { apiFetch } from '../utils/ApiFetch';
import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');
import { eventBus } from "../main.js";

export default {
    name: 'PostItemComment',
    components: {
        ProfileImage,
        PostItemCommentLike,
        PostItemCommentCreate,
        PostItemLike
    },
    props: {
        post: { type: Object, default: ['post'] }, 
    },
    data() {
        return {
            commentsList: [],
            dayjs: dayjs,
            userData: JSON.parse(localStorage.getItem("userData")),
            commentCreateKey: 0,
        }
    },
    created() {
        apiFetch
            .get(`/posts/${this.post.id}/comments/?limit=2`)
            .then(data => {
                this.commentsList = data.comments.rows;
                this.post.commentsCount = data.comments.count ;
            })
            .catch(error => {console.log(error)}); 

        eventBus.$on('loadPostComments', () => {
            this.loadPostComments();
        }); 
        eventBus.$on('forceRerenderCommentCreate', () => {
            this.forceRerender();
        }); 
    },
    methods: {
        forceRerender() {
            this.commentCreateKey += 1;
        },
        loadPostComments() {
            apiFetch
                .get(`/posts/${this.post.id}/comments`)
                .then(data => {
                    this.commentsList = data.comments.rows;
                    this.post.commentsCount = data.comments.count;
                    console.log("commentsList:", this.commentsList);
                })
                .then(() => { this.removeOtherCommentsLink(); })
                .catch(error => { console.log(error) }); 
        },
        // fonctions pour accès aux paramètres modifier/supprimer des posts
        isCreator(option) {
            const userId = this.userData.id;
            if (option == userId) {
               return true
            }
        },
        isAdmin() {
            const isAdmin = this.userData.admin;
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
                   alert("erreur")
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
                    });  
            }
        },
        targetForm() {
            document.querySelector(`.comment-form-${this.post.id}`).focus();
        },
        removeOtherCommentsLink() {
            let otherCommentsLink = document.querySelector(`.other-comments-${this.post.id}`);
            if(otherCommentsLink) {
                while(otherCommentsLink.firstChild) {
                    otherCommentsLink.removeChild(otherCommentsLink.firstChild);
                }
                let newTitle = document.createElement('p');
                newTitle.textContent = 'Votre commentaire :';
                newTitle.classList.add('text-secondary');
                otherCommentsLink.appendChild(newTitle);
            }
        }            
    } 
}
</script>

<style lang="scss">
.comments p, .comments a {
    font-size: 0.94rem;
}

.comments:hover {
    .comment-text{
        background-color: #f2f2f2;
        border-radius: 15px;
        padding: 0 10px;
    }
}

.comments-info:hover {
    cursor: pointer;
    text-decoration: underline;
}

.comment-dropdown .dropdown-toggle {
    padding: 0;
}

</style>