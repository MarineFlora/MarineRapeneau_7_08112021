<template>
    <div>
        <div v-if="posts.length">
            <!-- 1 POST -->
            <b-card class="my-3 p-0 shadow" v-for="post in posts" :key="post.updatedAt">
                <!-- CONTENU POST -->
                <PostItemContent :post="post" :loadPosts="loadPosts"/>

                <!-- COMMENTAIRES ET LIKES INFO -->
                <PostItemStats :post="post" />

                <!-- COMMENTAIRES DU POST -->
                <PostItemComment :post="post" />
                
            </b-card>
        </div>

        <div v-else-if="!posts.length && !noPost">
            <LoadSpinner />
        </div>    
        
        <div v-if="noPost" >
            <p class="my-4">Pas de publications disponibles pour le moment...</p>
        </div>
    </div>
</template>

<script>
import PostItemContent from '../components/PostItemContent.vue';
import PostItemComment from '../components/PostItemComment.vue';
import PostItemStats from './PostItemStats.vue';
import LoadSpinner from '../components/LoadSpinner.vue';

import router from '../router/index';
import { apiFetch } from '../utils/ApiFetch';
import { eventBus } from "../main.js";

export default {
    name: 'PostList',
    components: {
        PostItemContent,
        PostItemComment, 
        PostItemStats,
        LoadSpinner
    }, 
    data() {
        return {
            userData: JSON.parse(localStorage.getItem("userData")),
            posts: [],
            noPost: false,
        }
    },
    props: {
        userId: { type: Number}
    }, 
    mounted() {
        this.loadPosts();
        eventBus.$on('loadPosts', () => {
            this.loadPosts();
        });   
    },
    methods: {
        loadPosts() {
            let userIdParams = "";
            if (this.userId) {
                userIdParams = `?userId=${this.userId}`;
            }
            apiFetch
                .get(`/posts/${userIdParams}`)
                .then(data => { 
                    this.posts = data.posts;
                    if (data.posts.length === 0) {
                        this.noPost = true;
                    }
                })
                .catch(error => {
                   console.log(error);
                }); 
        },
    }
}

</script>