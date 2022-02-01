<template> 
    <div class="user-profile">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <!-- RETOUR DES INFORMATIONS DU PROFIL DE L'USER CHOISI-->
                <UserProfileInfos userPageTitle="Profil de " :userId="this.$route.params.userId" />

                <!-- PUBLICATIONS DE L'USER CHOISI -->
                <h2 class="my-4 mx-2 font-weight-bold text-left">Publications partagées</h2>
                <PostList :userId="this.$route.params.userId" /> 

            </b-container>
        </main>
    </div>
</template> 

<script> 
import TheHeader from '../components/TheHeader.vue';
import ProfileImage from '../components/ProfileImage.vue';
import PostList from '../components/PostList.vue';
import UserProfileInfos from '../components/UserProfileInfos.vue';

export default {
    name: 'UserProfile',
    components: {
        TheHeader,
        ProfileImage,
        PostList, 
        UserProfileInfos
    }
}
</script>

<style lang="scss">

</style>