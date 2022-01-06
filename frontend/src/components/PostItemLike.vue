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
                    @click="LikeOnePost"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le like" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="LikeOnePost"
                ></b-icon>  
            </transition>
        </div>
        <p class="text-secondary mx-2">{{ likesCount }}</p>
    </b-col>
</template>

<script>
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';

export default {
    name: 'PostItemLike',
    components: {
        
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
            likesCount: this.post.likesCount
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
        // envoi du like au back-end
        LikeOnePost() {
            this.likeSwap(!this.liked);

            const userId = localStorage.getItem("userId");
            let body = { 
                "userId": Number(userId),
            }
            apiFetch
                .post(`/posts/${this.post.id}/like`, body)
                .then(res => {
                    console.log("LikeOnePost fetch res:", res)
                    this.getLikesCount();
                })
                .catch(error => {
                    console.log(error);
                });  
        },
        // recuperation et affichage total likes du post 
        getLikesCount() {
            apiFetch
                .get(`/posts/${this.post.id}/likes`)
                .then((res) => this.likesCount = res.likes.length)
                .catch(error => console.log(error));
        },
        // recuperation et affichage du statut du like du post par l'user connecté
        getUserLike() {
            apiFetch
                .get(`/posts/${this.post.id}/like`)
                .then((res) => this.likeSwap(res.like))
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