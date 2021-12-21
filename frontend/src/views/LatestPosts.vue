<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
            
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>

                <!-- CREER UN POST -->
                <PostItemCreate />
               

                <!-- PUBLICATIONS + COMMENTAIRES associés -->
                <PostItem />
                          
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
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'LatestPosts',
    components: {
        TheHeader,
        BaseButton,
        PostItemCreate,
        PostItem
    },
   
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