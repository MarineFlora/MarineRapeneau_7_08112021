<template>
    <div class="d-flex justify-content-end align-items-center pl-3">
        <div class="like mx-2">
            <transition name="like-fill" mode="out-in">
                <b-icon 
                    icon="suit-heart" 
                    :font-scale="likeScale" 
                    title="j'aime le post" 
                    class="like-icon" 
                    v-if="!liked" key="1"
                    @click="likeOnePost"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le j'aime" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="likeOnePost"
                ></b-icon>  
            </transition>
        </div>

        <!-- retour total likes + affichage des users qui ont aimé lors du click-->
        <b-link 
            class="text-secondary" 
            :class="`likes-total-${post.id}`"
            v-b-modal="'modal-like-' +  post.id"
            title="publication aimée par"
            @click="getLikesInfos"
            v-if="this.likesCount > 0"
        >
            {{ likesCount }} J'aime
        </b-link>
        
        <b-modal 
            :id="'modal-like-' + post.id" 
            title="Publication aimée par" 
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
    mixins: [functionsMixin],  
    mounted() {
        this.getUserLike();
    },
    methods: {
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

</style>