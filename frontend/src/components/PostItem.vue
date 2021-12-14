<template>
<div>
    <div v-if="post">
        <div  class="pb-3 border border-left-0 border-top-0 border-right-0">
            <!-- USER + TIME -->
            <b-row class="px-3" align-v="center">
                <b-col cols="11" class="px-0" >
                    <div class="d-flex align-items-center">
                        <!-- changer adresse image dynamiquement -->
                        <ProfileImage imageHeight="65" /> 

                        <div class="px-3 d-flex flex-wrap">
                            <h2 class="pr-2">{{  }} {{ }}</h2>
                            <p class="text-secondary pr-2 d-none">admin</p>
                            <p class="text-secondary pr-2">· {{ post.createdAt }} </p>
                        </div>
                    </div>
                </b-col>
                <b-col cols="1" class="px-0 d-flex justify-content-end">
                    <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                    <b-dropdown size="sm" variant="outline-primary" offset="-130rem" v-b-tooltip.hover.v-primary.left="'paramètres'">
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
                        {{ post.description }}
                    </b-card-text> 
                </b-col>   
            </b-row>
            <!-- COMMENTAIRES ET LIKES INFO-->
            <b-row>
                <b-col cols="9" class="d-flex align-items-center">
                    <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                    <p class="text-secondary mx-2">{{ post.commentsCount }} commentaires</p>
                </b-col>

                <PostItemLike likeScale="1.3"/>
            </b-row>
        </div>
    </div>
    <div v-else>
        <p>chargement des publications... </p>
    </div>
</div>
</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemLike from '../components/PostItemLike.vue';
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import dayjs from 'dayjs' ;
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
require('dayjs/locale/fr');
// fonction : dayjs(data.posts[0].createdAt).locale('fr').fromNow()

export default {
    name: 'PostItem',
    components: {
        ProfileImage,
        PostItemLike
    },
   
    data() {
        return {
            post: null
        }
    },
    mounted() {
        apiFetch
            .get("/posts/")
            .then(data => { 
                this.post = data.posts
                console.log("PostItem-this.post:", this.post)
                console.log("PostItem-data.posts:", data.posts)
            })
            .catch(error => {
                if (!localStorage.getItem('userToken')) {
                    router.push({ name: 'Login' });
                } else {
                    alert("Une erreur est survenue"); 
                }
            }); 
    }
}
</script>

<style>
</style>