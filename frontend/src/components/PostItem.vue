<template>
    <div class="pb-3 border border-left-0 border-top-0 border-right-0 ">
        <!-- USER + TIME -->
        <b-row class="px-3" align-v="center">
            <!-- changer adresse image dynamiquement -->
            <ProfileImage imageHeight="65" /> 

            <div class="d-flex">
                <div class="px-3">
                    <h2>Yves Legrand</h2>
                    <p class="text-secondary d-none">admin</p>
                </div>
                <p class="text-secondary">· 4h</p>
            </div>
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

            <b-col cols="3" class="d-flex justify-content-end align-items-center">
                <b-icon icon="suit-heart" font-scale="1.3" title="aime ce post"></b-icon>
                <p class="text-secondary mx-2">5</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'PostItem',
    components: {
        ProfileImage
    } 
}
</script>

<style>
</style>