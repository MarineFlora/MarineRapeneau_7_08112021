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

                        <!-- COMMENTAIRES -->
                        <PostItemComment :post="post" :loadPosts="loadPosts"/>
                       
                    </b-card>
                </div>
                <div v-else>
                    <p class="my-4">Pas de publications disponibles pour le moment... 
                    </br>Et si vous partagiez quelque chose ?</p>
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



</style>