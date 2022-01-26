<template>
    <div>
        <!-- retour accueil et titre page -->
        <div class="d-flex align-items-center">
            <router-link to="/" class="text-dark arrow-link p-1">
                <b-icon icon="arrow-left" font-scale="1.75" title="retour accueil"></b-icon>
            </router-link>
            <h1 class="my-4 mx-2 font-weight-bold">{{ userPageTitle }} {{ user.firstName }} {{ user.lastName }}</h1>
        </div>

        <!-- informations publiques du profil -->
        <ProfileImage imageHeight="120" :imageUrl="user.profilePhoto" />
        <div class="font-weight-bold pt-2">
            <p class="user-name">{{ user.firstName }} {{ user.lastName }}</p>
            <p>{{ user.profession }}</p>
        </div>
        <p class="py-3">{{ user.userDescription }}</p>
    </div>
</template>

<script> 
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import { eventBus } from "../main.js";

    export default {
        name: 'UserProfileInfos',
        components: {
            ProfileImage
        },
        data() {
            return {
                user: {},
            }
        },
        props: {
            userPageTitle: String,
            userId: Number
        },
        created() {
            this.loadUserProfile();
            eventBus.$on('loadUserProfile', () => {
                this.loadUserProfile();
            }); 
        },
        methods: {
            loadUserProfile(){
                apiFetch
                    .get(`/auth/user-profile/${this.userId}`)
                    .then(data => { 
                        this.user = data.user;
                        // envoi des données à MyProfile qui renvoi en props à MyProfileEdit
                        this.$emit('userInfos', this.user) 
                    })
                    .catch(error => console.log(error)); 
            }, 
        }
    }
</script>

<style lang="scss">

</style>