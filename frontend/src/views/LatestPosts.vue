<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
            
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>

                <!-- CREER UN POST -->
                <PostItemCreate />

                <!-- UNE PUBLICATION + COMMENTAIRES associés -->
                <div v-if="posts.length">
                    <div v-for="post in posts" :key="post.id">
                        <b-card class="my-3 p-0 shadow">
                            <!-- 1 POST -->
                            <PostItem />
                            <!-- COMMENTAIRES liste-->
                            <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
                                <PostItemComment />
                                <PostItemComment />
                            </div>

                            <!-- AJOUTER UN COMMENTAIRE meme principe que creer post -->
                            <PostItemCommentCreate />

                        </b-card>
                    </div>
                </div>
                <div v-else>
                    <p>chargement des publications... </p>
                </div>

                <b-row class="my-4 mx-0">
                    <p>
                        <b-icon icon="arrow-clockwise" font-scale="1.5" class="mr-1"></b-icon>
                        Il n’y a pas d’autres publications à afficher...
                    </p>
                </b-row>

            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import BaseButton from '../components/BaseButton.vue';
import PostItemCreate from '../components/PostItemCreate.vue';
import PostItem from '../components/PostItem.vue';
import PostItemComment from '../components/PostItemComment.vue';
import PostItemCommentCreate from '../components/PostItemCommentCreate.vue';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'LatestPosts',
    components: {
        TheHeader,
        BaseButton,
        PostItemCreate,
        PostItem,
        PostItemComment,
        PostItemCommentCreate
    },
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        apiFetch
            .get("/posts/")
            .then(data => { 
                this.posts = data.posts
                console.log("LatestPost-this.posts:", this.posts)
                console.log("LatestPost-data.posts:", data.posts)
            })
            .catch(error => {
                if (!localStorage.getItem('userToken')) {
                    router.push({ name: 'Login' });
                } else {
                    console.log("Une erreur est survenue"); 
                }
            });
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
.add-media{
    font-size: 0.9rem;
    cursor: pointer;
}

.comments p, .comments a {
    font-size: 0.9rem;
}

</style>