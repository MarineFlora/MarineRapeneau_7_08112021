<template>
    <b-col cols="3" class="d-flex justify-content-end align-items-center">
        <div class="like">
            <transition name="like-fill" mode="out-in">
                <b-icon 
                    icon="suit-heart" 
                    :font-scale="likeScale" 
                    title="liker" 
                    class="like-icon" 
                    v-if="!liked" key="1"
                    @click="likeOnePost"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le like" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="likeOnePost"
                ></b-icon>  
            </transition>
        </div>

        <!-- retour total likes + affichage des users qui ont aimé lors du click-->
        <b-link 
            class="text-secondary mx-2" 
            :class="`likes-total-${post.id}`"
            v-b-modal="'modal-like-' +  post.id"
            title="aimé par"
            @click="getLikesInfos"
        >
            {{ likesCount }}
        </b-link>
        
        <b-modal 
            :id="'modal-like-' + post.id" 
            title="Aimé par" 
            ok-title="modifier"
            hide-footer
        >
        <div class="d-flex" v-for="like in likesList" :key="">
            <ProfileImage imageHeight="50" /> 
            <div class="px-3 my-2">
                <p class="font-weight-bold">{{ like.User.firstName }} {{ like.User.lastName }}</p>
                <p>{{ like.User.userDescription }}</p>
            </div>
        </div>
        </b-modal>

    </b-col>
</template>

<script>
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import ProfileImage from './ProfileImage.vue';

export default {
    name: 'PostItemLike',
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
        }
    },
    data() {
        return {
            liked: false,
            likesCount: this.post.likesCount,
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
        likeOnePost() {
            this.likeSwap(!this.liked);

            apiFetch
                .post(`/posts/${this.post.id}/like`)
                .then(res => {
                    console.log("LikeOnePost fetch res:", res)
                    this.getLikesInfos();
                })
                .catch(error => console.log(error));  
        },
        // recuperation et affichage total likes du post après ajout et info "aimé par" 
        getLikesInfos() {
            apiFetch
                .get(`/posts/${this.post.id}/likes`)
                .then((res) => {
                    this.likesCount = res.likes.length;
                    this.hideLikesNumber();
                    this.likesList = res.likes;
                })
                .catch(error => console.log(error));
        },
        // recuperation et affichage du statut du like du post par l'user connecté
        getUserLike() {
            apiFetch
                .get(`/posts/${this.post.id}/like`)
                .then((res) => {
                    this.likeSwap(res.like);
                    this.hideLikesNumber();
                })
                .catch(error => console.log(error));
        },
        // ajout opacity 0 au nombre quand 0 like
        hideLikesNumber() {
            let totalLikesNumber = document.querySelector(`.likes-total-${this.post.id}`);
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

</style>