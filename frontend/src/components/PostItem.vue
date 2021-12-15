<template>
    <div v-if="posts.length">
        <b-card class="my-3 p-0 shadow" v-for="post in posts" :key="post.createdAt">
            <!-- POST SANS COMMENTAIRES -->
            <div class="pb-3 border border-left-0 border-top-0 border-right-0">
                <!-- USER + TIME -->
                <b-row class="px-3" align-v="center">
                    <b-col cols="11" class="px-0" >
                        <div class="d-flex align-items-center">
                            <!-- changer adresse image dynamiquement -->
                            <ProfileImage imageHeight="65" /> 

                            <div class="px-3 d-flex flex-wrap">
                                <h2 class="pr-2">{{ post.User.firstName }} {{ post.User.lastName }}</h2>
                                <p class="text-secondary pr-2 d-none">admin</p>
                                <p class="text-secondary pr-2">· {{ dayjs(post.createdAt).locale('fr').fromNow() }} </p>
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

            <!-- COMMENTAIRES liste
            d-none si 0 comments ? -->
            <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
                <PostItemComment />
                <PostItemComment />
            </div>

            <!-- AJOUTER UN COMMENTAIRE -->
            <PostItemCommentCreate />
        
        </b-card>
    </div>
    <div v-else>
        <p>chargement des publications... </p>
    </div>

</template>

<script>
import ProfileImage from '../components/ProfileImage.vue';
import PostItemLike from '../components/PostItemLike.vue';
import PostItemComment from '../components/PostItemComment.vue';
import PostItemCommentCreate from '../components/PostItemCommentCreate.vue';
import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';
import dayjs from 'dayjs' ;
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
require('dayjs/locale/fr');

export default {
    name: 'PostItem',
    components: {
        ProfileImage,
        PostItemLike,
        PostItemComment,
        PostItemCommentCreate
    },
   
    data() {
        return {
            posts: [],
            dayjs: dayjs
        }
    },
    mounted() {
        if (!localStorage.getItem('userToken')) {
            router.push({ name: 'Login' });
        } else {
        apiFetch
            .get("/posts/")
            .then(data => { 
                this.posts = data.posts
                console.log("PostItem-this.post:", this.posts)
            })
            .catch(error => {
                console.log(error)
                alert("Une erreur est survenue");
            }); 
        }
    }
}
</script>

<style>
</style>