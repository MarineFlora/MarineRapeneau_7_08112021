<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
            
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>
                <!-- CREER UN POST -->
                <PostItemCreate />

                <!-- UNE PUBLICATION + COMMENTAIRES associés -->
                <b-card class="my-3 p-0 shadow">
                    <!-- 1 POST -->
                    <PostItem />

                    <!-- COMMENTAIRES liste-->
                    <PostItemComment />

                    <!-- AJOUTER UN COMMENTAIRE meme principe que creer post -->
                    <PostItemCommentCreate />

                </b-card>

                <b-row class="my-4">
                    <b-icon icon="arrow-clockwise" font-scale="1.5" class="mx-3"></b-icon>
                    <p >Il n’y a pas d’autres publications à afficher...</p>
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
            file: null
        }
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