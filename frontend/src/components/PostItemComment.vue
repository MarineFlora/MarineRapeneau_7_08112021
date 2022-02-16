<template>
    <div>   
        <!-- BLOC COMMENTAIRES --> 
        <div class="border border-left-0 border-right-0 border-top-0 mt-3" v-if="post.commentsCount > 0">
            <!-- 1 COMMENTAIRE -->
            <div class="mb-3 comments d-flex" align-v="start" v-for="comments in commentsList" :key="comments.id">

                <router-link :to="{ name: 'UserProfile', params: { userId: comments.User.id } }">
                    <ProfileImage imageHeight="40" :imageUrl="comments.User.profilePhoto" :alt="`image de profil de ${comments.User.firstName}`"/>
                </router-link>
                
                <b-col class="pr-0">
                    <!-- INFORMATIONS DU COMMENTAIRE ET PARAMÈTRES -->
                    <b-row class="px-3" align-v="start">
                        <!-- auteur et date du post -->
                        <b-col cols="11" class="px-0">
                            <div class="d-flex align-items-end flex-wrap pr-2">
                                <router-link :to="{ name: 'UserProfile', params: { userId: comments.User.id } }" style="color: inherit;">
                                    <p class="font-weight-bold pr-1">{{ comments.User.firstName }} {{ comments.User.lastName }}</p>
                                </router-link>
                                <b-icon v-if="comments.User.admin" icon="person-check-fill" class="text-dark px-1" font-scale="1.5" title="admin"></b-icon> 
                                <p class="text-secondary pl-1">· {{ dayjs(comments.createdAt).locale('fr').fromNow(true) }}</p>
                            </div>
                        </b-col>

                        <!-- paramètres du commentaire -->
                        <b-col cols="1" class="px-0 d-flex justify-content-end">
                            <b-dropdown 
                                size="sm" 
                                variant="tertairy" 
                                right 
                                no-caret v-b-tooltip.hover.v-secondary.left="'paramètres'"
                                class="comment-dropdown"
                                :id="'list-params-comment' + comments.id"
                            >
                                <template #button-content>
                                    <b-icon icon="caret-down-fill" font-scale="0.9"></b-icon>
                                </template>
                            
                                <!-- Option 1 : modifier le commentaire -->
                                <b-dropdown-item 
                                    v-if="isCreator(comments.userId)" 
                                    v-b-modal="'modal-comment-modify-' + comments.id"
                                > Modifier le commentaire
                                </b-dropdown-item>
                                <!-- modal de modification du commentaire -->
                                <b-modal 
                                    :id="'modal-comment-modify-' + comments.id" 
                                    title="Modifier le commentaire" 
                                    ok-title="modifier"
                                    cancel-title="annuler"
                                    @ok="modifyComment(`${comments.id}`, $event)"
                                    centered
                                >
                                    <b-form class="col p-2 overflow-hidden" >
                                        <!-- modification contenu -->
                                        <b-form-textarea                            
                                            rows="2"
                                            max-rows="10"
                                            v-model="comments.description"
                                            class="modify-description"
                                            title="modifier le commentaire"
                                        ></b-form-textarea>
                                        <p class="text-danger" v-if="errorMessage">{{ errorMessage }} </p>
                                    </b-form>
                                </b-modal>

                                <!-- Option 2 : supprimer le commentaire -->
                                <b-dropdown-item 
                                    v-if="isCreator(comments.userId) || isAdmin()" 
                                    v-b-modal="'modal-comment-delete' + comments.id"  
                                > Supprimer le commentaire
                                </b-dropdown-item>
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

                                <!-- Option 3 : signaler le commentaire -->
                                <b-dropdown-item 
                                    v-if="!isCreator(comments.userId)" 
                                    :to="{ name: 'AboutPage', params: { signalToMods: comments, type: 'comment' } }"
                                > Signaler le commentaire aux modérateurs
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>

                    <!-- CONTENU DU COMMENTAIRE -->
                    <div class="d-flex align-items-end text-secondary pr-3">
                        <p class="comment-text text-left text-break pr-1">{{ comments.description }}</p>
                        <!-- like associé au commentaire -->
                        <PostItemCommentLike :post="post" :comments="comments" class="comment-like" likeScale="1" />
                    </div>
                </b-col>
            </div>

            <!-- lien pour afficher + de commentaires -->
            <div class="py-2" :class="'other-comments-' + post.id" v-if="post.commentsCount > 2">
                <b-link class="text-secondary mx-2" @click="loadPostComments">afficher {{ post.commentsCount -2 }} autres commentaires</b-link> 
            </div> 
        </div>
         
        <!-- CRÉATION D'UN COMMENTAIRE -->
        <PostItemCommentCreate :post="post" :loadPostComments="loadPostComments" :key="commentCreateKey"/>
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
import { eventBus } from "../main.js";
import functionsMixin from '../mixins/functionsMixin.js'

export default {
    name: 'PostItemComment',
    components: {
        ProfileImage,
        PostItemCommentLike,
        PostItemCommentCreate,
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
            errorMessage: ""
        }
    },
    mixins: [functionsMixin],   
    created() {
        this.loadTwoPostComments();
        
        eventBus.$on('loadTwoPostComments', () => {
            this.loadTwoPostComments();
        });
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
        loadTwoPostComments() {
            apiFetch
            .get(`/posts/${this.post.id}/comments/?limit=2`)
            .then(data => {
                this.commentsList = data.comments.rows;
                this.post.commentsCount = data.comments.count ;
            })
            .catch(error => {console.log(error)}); 
        },
        loadPostComments() {
            apiFetch
                .get(`/posts/${this.post.id}/comments`)
                .then(data => {
                    this.commentsList = data.comments.rows;
                    this.post.commentsCount = data.comments.count;
                })
                .then(() => { this.removeOtherCommentsLink(); })
                .catch(error => { console.log(error) }); 
        },
        modifyComment(id, event) { 
            const description = document.querySelector(".modify-description").value

            if (description === '') {
                this.loadPostComments();
                event.preventDefault()
                this.errorMessage="vous ne pouvez pas envoyer un commentaire vide"
            } else {  
                this.errorMessage='';
                let body = { 
                    "description": description
                }

                apiFetch
                    .put(`/posts/${this.post.id}/comment/` + id, body)
                    .then(res => {
                        this.loadPostComments();
                    })
                    .catch(error => {
                        console.log(error);
                    });  
            }
        },
        deleteComment(id) {
            apiFetch
                .delete(`/posts/${this.post.id}/comment/` + id)
                .then(res => {
                    this.loadPostComments();
                })
                .catch(error => {
                    console.log(error)
                }); 
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