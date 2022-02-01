<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>
                <!-- CREER UN POST -->
                <PostItemCreate />
            </b-container>
            
            <b-container class="maxwidth-page p-0 p-sm-3">
                <!-- TOUS LES POSTS -->
                <PostList />  
            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import BaseButton from '../components/BaseButton.vue';
import PostItemCreate from '../components/PostItemCreate.vue';
import PostList from '../components/PostList.vue';


export default {
    name: 'LatestPosts',
    components: {
        TheHeader,
        BaseButton,
        PostItemCreate,
        PostList,
    }
}
</script>

<style lang="scss">

</style>