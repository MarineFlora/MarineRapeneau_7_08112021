<template>
    <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
        <!-- 1 COMMENTAIRE -->
        <b-row class="mb-3" align-v="start">
            <!-- changer adresse image dynamiquement -->
            <ProfileImage imageHeight="45" />

            <div class="px-3">
                <div class="d-flex align-items-center">
                    <p class="font-weight-bold pr-2">Laura Loiseau</p>
                    <b-icon icon="person-check-fill" class="text-dark pr-2 d-none" font-scale="1.5" title="admin"></b-icon>
                    <p class="text-secondary">· 2h</p>
                </div>
                <p>trop cool ! :)</p>
                <div class="d-flex align-items-center text-secondary mt-1">
                    <b-link class="mr-4 text-secondary">Répondre</b-link>
                    <b-icon icon="suit-heart" font-scale="0.9" title="aimer ce commentaire"></b-icon>
                </div>
            </div>
        </b-row>
        
    </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'PostItemComment',
    components: {
        ProfileImage
    } 
}
</script>

<style>
</style>