<template>
    
        <!-- 1 COMMENTAIRE -->
        <b-row class="mb-3" align-v="start">
            <!-- changer adresse image dynamiquement -->
            <ProfileImage imageHeight="45" />

            <b-col class="px-3">
                <div class="d-flex align-items-center">
                    <p class="font-weight-bold pr-2">Laura Loiseau</p>
                    <b-icon icon="person-check-fill" class="text-dark pr-2 d-none" font-scale="1.5" title="admin"></b-icon>
                    <p class="text-secondary">· 2h</p>
                </div>

                <p>trop cool ! :) gdfjgklfdugire ghfdgirheit gfdhgudfhgury g</p>

                <div class="d-flex align-items-center text-secondary mt-1">
                    <b-link class="p-0 text-secondary col">Répondre</b-link>
                    <PostItemLike likeScale="0.9"/>
                </div>
            </b-col>
        </b-row>
   
    
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemLike from '../components/PostItemLike.vue';

export default {
    name: 'PostItemComment',
    components: {
        ProfileImage,
        PostItemLike
    } 
}
</script>

<style>
</style>