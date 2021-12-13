<template>
    <div class="pb-3 border border-left-0 border-top-0 border-right-0 ">
        <!-- USER + TIME -->
        <b-row class="px-3" align-v="center">
            <b-col cols="11" class="px-0" >
                <div class="d-flex align-items-center">
                    <!-- changer adresse image dynamiquement -->
                    <ProfileImage imageHeight="65" /> 

                    <div class="px-3 d-flex flex-wrap">
                        <h2 class="pr-2">Yves Legrand</h2>
                        <p class="text-secondary pr-2">admin</p>
                        <p class="text-secondary pr-2">· 4h</p>
                    </div>
                </div>
            </b-col>
            <b-col cols="1" class="px-0 d-flex justify-content-end">
                <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                <b-dropdown size="sm" variant="outline-primary" offset="-130rem" title="paramètres">
                    <b-dropdown-item href="#">Modifier</b-dropdown-item>
                    <b-dropdown-item href="#">Supprimer</b-dropdown-item>
                    <b-dropdown-item href="/about">Signaler</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <!-- CONTENU PUBLICATION -->
        <b-row>
            <b-col class="py-3">
                <b-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                    Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum massa
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                    Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum mass...Afficher la suite
                </b-card-text> 
            </b-col>   
        </b-row>
        <!-- COMMENTAIRES ET LIKES INFO-->
        <b-row>
            <b-col cols="9" class="d-flex align-items-center">
                <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                <p class="text-secondary mx-2">2 commentaires</p>
            </b-col>

            <PostItemLike likeScale="1.3"/>
        </b-row>
    </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemLike from '../components/PostItemLike.vue';

export default {
    name: 'PostItem',
    components: {
        ProfileImage,
        PostItemLike
    } 
}
</script>

<style>
</style>