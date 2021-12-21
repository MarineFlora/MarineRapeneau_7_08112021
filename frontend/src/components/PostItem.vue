<template>  
    <div v-if="posts.length">

        <b-card class="my-3 p-0 shadow" v-for="post in posts" :key="post.id">
            <!-- POST SANS COMMENTAIRES -->
            <div class="pb-3 border border-left-0 border-top-0 border-right-0">
                <!-- USER + TIME -->
                <b-row class="px-3" align-v="center">
                    <b-col cols="11" class="px-0" >
                        <div class="d-flex align-items-center">
                            <!-- changer adresse image dynamiquement -->
                            <ProfileImage imageHeight="60" /> 

                            <div class="px-3 d-flex align-items-end flex-wrap">
                                <h2 class="pr-2">{{ post.User.firstName }} {{ post.User.lastName }}</h2>
                                <div class="text-secondary pr-2 d-flex align-items-end">
                                    <p :class="{ 'd-none': !post.User.admin }">
                                        admin
                                        <b-icon icon="person-check-fill" class="text-dark pl-2" font-scale="1.5" title="admin"></b-icon>
                                    </p>
                                </div>
                                <p class="text-secondary pr-2">· {{ dayjs(post.createdAt).locale('fr').fromNow() }} </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="1" class="px-0 d-flex justify-content-end">
                        <!-- si propriétaire du post afficher les 3 options sinon juste signaler -->
                        <b-dropdown size="sm" variant="outline-primary" offset="-130rem" v-b-tooltip.hover.v-primary.left="'paramètres'">
                            <b-dropdown-item href="#" >Modifier</b-dropdown-item>
                            <b-dropdown-item href="#" v-b-modal="'modal-' +  post.id">Supprimer</b-dropdown-item>
                            <b-dropdown-item href="/about">Signaler</b-dropdown-item>
                        </b-dropdown>

                        <!-- confirmation de suppression -->
                        <b-modal 
                            :id="'modal-' + post.id" 
                            title="Voulez-vous vraiment supprimer ce post ?" 
                            ok-title = "supprimer" 
                            @ok="deletePost(`${post.id}`)"
                        >
                            <p>La publication {{ post.id }} sera supprimée définitivement. </p>
                        </b-modal>

                    </b-col>
                </b-row>
                <!-- CONTENU PUBLICATION -->
                <b-row>
                    <b-col class="py-3">
                        <b-card-text class="post-content">
                            <div class="d-flex justify-content-center mb-3">
                                <b-img :src="post.imageUrl" alt="" class="post-image" ></b-img>
                            </div>
                            <p>{{ post.description }}</p>
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
        <p class="my-4">aucune publication disponible pour le moment... </p>
    </div>
    

</template>

<script>
import ProfileImage from './ProfileImage.vue';
import PostItemLike from './PostItemLike.vue';
import PostItemComment from './PostItemComment.vue';
import PostItemCommentCreate from './PostItemCommentCreate.vue';
import BaseButton from './BaseButton.vue';

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
        PostItemCommentCreate,
        BaseButton
    },
   
    data() {
        return {
            posts: [],
            dayjs: dayjs
        }
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        loadPosts() {
            apiFetch
                .get("/posts/")
                .then(data => { 
                    this.posts = data.posts;
                    if (data.error) {
                        this.logOut();
                    }
                    console.log("PostItem-this.posts:", this.posts)
                    console.log("error:", data.error)
                })
                .catch(error => {
                    console.log(error)
                    alert("Une erreur est survenue");
                }); 
        },

        logOut() {
            localStorage.clear();
            router.push({ name: 'Login' });
        },
        
        deletePost(option) {
            apiFetch
                .delete("/posts/" + option)
                .then(res => {
                    console.log("delete res:", res)
                })
                .catch(error => {
                    console.log(error)
                    alert("Une erreur est survenue");
                }); 
        }
    }
}
</script>

<style lang="scss">
.post-content {
    white-space: pre-wrap;
}
.post-image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 25rem;
}

@media (max-width: 576px) {
        .post-image {
            max-height: 20rem;
        }
    }
</style>