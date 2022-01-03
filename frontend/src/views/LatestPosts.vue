<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
            
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>

                <!-- CREER UN POST -->
                <PostItemCreate :loadPosts="loadPosts"/>
               
               <!-- TOUS LES POSTS -->
                <div v-if="posts.length">
                    <b-card class="my-3 p-0 shadow" v-for="post in posts" :key="post.updatedAt">
                        <!-- CONTENU PUBLICATION -->
                        <PostItemContent :post="post" :loadPosts="loadPosts"/>

                        <!-- COMMENTAIRES d-none si 0 comments ? -->
                        <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
                            <PostItemComment />
                            <PostItemComment />
                        </div>

                        <!-- AJOUTER UN COMMENTAIRE -->
                        <PostItemCommentCreate />
                    </b-card>
                </div>
                <div v-else>
                    <p class="my-4">
                        <b-spinner label="Loading..."></b-spinner>
                        chargement des publications... 
                    </p>
                </div>    

            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import BaseButton from '../components/BaseButton.vue';
import PostItemCreate from '../components/PostItemCreate.vue';
import PostItemContent from '../components/PostItemContent.vue';
import PostItemComment from '../components/PostItemComment.vue';
import PostItemCommentCreate from '../components/PostItemCommentCreate.vue';
import router from '../router/index';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'LatestPosts',
    components: {
        TheHeader,
        BaseButton,
        PostItemCreate,
        PostItemContent,
        PostItemComment,
        PostItemCommentCreate
    },
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        loadPosts() {
            apiFetch
                .get("/posts/")
                .then(data => { 
                    this.posts = data.posts;
                   
                    if (data.error) {
                        this.logOut();
                    }
                    console.log("PostItem-this.posts:", this.posts)
                    console.log("error:", data.error)
                })
                .catch(error => {
                    console.log(error)
                    //alert("Une erreur est survenue");
                }); 
        },
        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
        },
    }
   
}
</script>

<style lang="scss">

// classes utilisées sur toutes les pages sauf connexion

.btn-pages {
    font-size: 1.15rem !important;
    max-width: 110px !important;
}

.maxwidth-page {
    max-width: 720px !important;
}

// classes page posts

.comments p, .comments a {
    font-size: 0.9rem;
}

</style>