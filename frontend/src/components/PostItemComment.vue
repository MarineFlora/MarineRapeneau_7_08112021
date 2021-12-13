<template>
        <!-- 1 COMMENTAIRE -->
        <b-row class="mb-3" align-v="start">
            <!-- changer adresse image dynamiquement -->
            <ProfileImage imageHeight="45" />

            <b-col class="px-3">
                <b-row class="px-3" align-v="center">
                    <b-col cols="11" class="px-0" >
                        <div class="d-flex align-items-center flex-wrap pr-2">
                            <p class="font-weight-bold pr-2">Laura Loiseau</p>
                            <b-icon icon="person-check-fill" class="text-dark pr-2" font-scale="1.5" title="admin"></b-icon>
                            <p class="text-secondary">· 2h</p>
                        </div>
                    </b-col>
                    <b-col cols="1" class="px-0 d-flex justify-content-end">
                        <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                        <b-dropdown size="sm" variant="link" offset="-130rem" no-caret v-b-tooltip.hover.v-primary.left="'paramètres'">
                            <template #button-content>
                            <b-icon icon="caret-down-fill" font-scale="0.9"></b-icon>
                            </template>
                        
                            <b-dropdown-item href="#">Modifier</b-dropdown-item>
                            <b-dropdown-item href="#">Supprimer</b-dropdown-item>
                            <b-dropdown-item href="/about">Signaler</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-row>

                <p>trop cool ! :) Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit adipiscing elit</p>

                <div class="d-flex align-items-center text-secondary mt-1">
                    <b-link class="p-0 text-secondary col">Répondre</b-link>
                    <PostItemLike likeScale="0.9" class="px-0"/>
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