<template>
    <div class="d-flex justify-content-end align-items-center">
        <!-- PERMUTATION COEUR PLEIN/VIDE-->
        <div class="like mx-1">
            <transition name="like-fill" mode="out-in">
                <b-icon 
                    icon="suit-heart" 
                    :font-scale="likeScale" 
                    title="j'aime le commentaire" 
                    class="like-icon" 
                    v-if="!liked" key="1"
                    @click="likeOneComment"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le j'aime" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="likeOneComment"
                ></b-icon>  
            </transition>
        </div>

        <!-- RETOUR TOTAL LIKES -->
        <b-link 
            class="text-secondary likes-count" 
            :class="`likes-comment-total-${comments.id}`"
            v-b-modal="'modal-comment-like-' +  comments.id"
            title="commentaire aimé par"
            @click="getLikesInfos"
            v-if="this.likesCount > 0"
        >
            {{ likesCount }}
        </b-link>

        <!-- affichage des users qui ont aimé -->
        <b-modal 
            :id="'modal-comment-like-' + comments.id" 
            title="Commentaire aimé par" 
            ok-title="modifier"
            hide-footer
            v-if="this.likesCount > 0"
            centered
        >
            <div class="d-flex mb-3" v-for="like in likesList" :key="">
                <ProfileImage imageHeight="50" :imageUrl="like.User.profilePhoto" /> 
                <div class="px-3">
                    <p class="font-weight-bold">{{ like.User.firstName }} {{ like.User.lastName }}</p>
                    <p class="font-weight-light">{{ like.User.userDescription }}</p>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import ProfileImage from './ProfileImage.vue';
import functionsMixin from '../mixins/functionsMixin.js'

export default {
    name: 'PostItemCommentLike',
    components: {
        ProfileImage
    },
    props: {
        likeScale: String,
        post: { 
            type: Object, 
            default() {
                return { post: ['post'] }
            }   
        }, 
        comments: {
            type: Object, 
            default() {
                return { comments: ['comments'] }
            } 
        }
    },
    data() {
        return {
            liked: false,
            likesCount: Number,
            likesList: []
        }
    },
    mixins: [functionsMixin],  
    mounted() {
        this.getUserLike();
        this.getLikesInfos();
    },
    methods: {
        // envoi du like au back-end et maj infos
        likeOneComment() {
            this.likeSwap(!this.liked);

            apiFetch
                .post(`/posts/${this.post.id}/comment/${this.comments.id}/like`)
                .then(res => {
                    this.getLikesInfos();
                })
                .catch(error => console.log(error));  
        },
        // recuperation et affichage total likes du commentaire après ajout et info "aimé par" 
        getLikesInfos() {
            apiFetch
                .get(`/posts/${this.post.id}/comment/${this.comments.id}/likes`)
                .then((res) => {
                    this.likesCount = res.likes.length;
                    this.likesList = res.likes;
                })
                .catch(error => console.log(error));
        },
        // recuperation et affichage du statut du like du commentaire par l'user connecté
        getUserLike() {
            apiFetch
                .get(`/posts/${this.post.id}/comment/${this.comments.id}/like`)
                .then((res) => {
                    this.likeSwap(res.like);
                })
                .catch(error => console.log(error));
        },
    }
}
</script>

<style lang="scss">

.like-fill-enter-active, .like-fill-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.like-fill-enter, .like-fill-leave-active {
  opacity: 0;
}

.like-icon { 
    cursor: pointer;
}
.likes-count {
    font-size: 0.85rem !important;
}
</style>