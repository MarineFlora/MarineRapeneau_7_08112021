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
                    @click="liked = true"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le like" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="liked = false"
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
    methods: {
      /*  getLikesCount() {
            apiFetch
                .get(`/posts/${this.post.id}/like`)
                .then(res => {
                    console.log("res like fetch:", res)
                    //this.likesCount = res.posts[0].likesCount; // !! test, à changer
                }) 
                .catch(error => {
                    if (!localStorage.getItem('userToken')) {
                        router.push({ name: 'Login' });
                    } else {
                      //  alert("Une erreur est survenue"); 
                       console.log("error:", error)
                    }
                });
        },*/
        LikeOnePost() {
            
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