<template>
    <div class="d-flex justify-content-end align-items-center px-2">
        <div class="like">
            <transition name="like-fill" mode="out-in">
                <b-icon 
                    icon="suit-heart" 
                    :font-scale="likeScale" 
                    title="j'aime" 
                    class="like-icon" 
                    v-if="!liked" key="1"
                    @click="likeOneComment"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le like" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="likeOneComment"
                ></b-icon>  
            </transition>
        </div>

        <!-- retour total likes + affichage des users qui ont aimé lors du click-->
        <b-link 
            class="text-secondary mx-1 likes-count" 
            :class="`likes-comment-total-${comments.id}`"
            v-b-modal="'modal-comment-like-' +  comments.id"
            title="aimé par"
            @click="getLikesInfos"
        >
            {{ likesCount }}
        </b-link>
        
        <b-modal 
            :id="'modal-comment-like-' + comments.id" 
            title="Aimé par" 
            ok-title="modifier"
            hide-footer
            v-if="this.likesCount > 0"
            centered
        >
        <div class="d-flex" v-for="like in likesList" :key="">
            <ProfileImage imageHeight="50" /> 
            <div class="px-3 my-2">
                <p class="font-weight-bold">{{ like.User.firstName }} {{ like.User.lastName }}</p>
                <p>{{ like.User.userDescription }}</p>
            </div>
        </div>
        </b-modal>

    </div>
</template>

<script>
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import ProfileImage from './ProfileImage.vue';

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
            likesCount: this.comments.likesCount,
            likesList: []
        }
    },
    mounted() {
        this.getUserLike();
    },
    methods: {
        // permutation coeurs plein/vide
        likeSwap(condition) {
            if (condition) {
                this.liked = true;
            } else {
                this.liked = false;
            }
        },
        // envoi du like au back-end et maj infos
        likeOneComment() {
            this.likeSwap(!this.liked);

            apiFetch
                .post(`/posts/${this.post.id}/comment/${this.comments.id}/like`)
                .then(res => {
                    console.log("LikeOneComment res:", res)
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
                    this.hideLikesNumber();
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
                    this.hideLikesNumber();
                })
                .catch(error => console.log(error));
        },
        // ajout opacity 0 au nombre quand 0 like
        hideLikesNumber() {
            let totalLikesNumber = document.querySelector(`.likes-comment-total-${this.comments.id}`);
            if (this.likesCount == 0) { 
                totalLikesNumber.style.opacity = "0";
            } else {
               totalLikesNumber.style.opacity = "1";
            }
        }
        
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