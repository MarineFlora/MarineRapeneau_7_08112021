<template>
    <b-row class="pl-3 mt-3">
        <router-link :to="'/user-profile'">
            <ProfileImage imageHeight="50" :imageUrl="userData.profilePhoto" />
        </router-link>

        <b-form class="col " @submit.prevent="createComment">
            <b-form-textarea       
                :class="'comment-form-' + post.id"                     
                placeholder="Ecrivez un commentaire" 
                rows="1"
                max-rows="10"
                v-model="commentDescription"
                title="ajouter un commentaire"
            ></b-form-textarea>

            <p class="text-danger">{{ errorMessage }}</p>

            <div class="d-flex justify-content-end mt-3">
                <BaseButton button-title="Répondre" class="btn-sm btn-pages"/> 
            </div>
        </b-form>
    </b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'PostItemCommentCreate',
    components: {
        BaseButton,
        ProfileImage
    },
    props: {
        post: { type: Object, default: ['post'] },
        loadPostComments: { type: Function },
    },
    data() {
        return {
            commentDescription: '',
            errorMessage: '',
            userData: JSON.parse(localStorage.getItem("userData"))
        }
    },
    methods: {
        createComment() {
            const commentDescription = this.commentDescription;
            if (commentDescription !== '') {
                this.errorMessage = '';
                let body = { 
                    "description": commentDescription
                }

                apiFetch
                    .post(`/posts/${this.post.id}/comment`, body)
                    .then(res => {
                        this.commentDescription = "";
                        this.loadPostComments();
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorMessage="une erreur est survenue";
                    });  
            } else {
                this.errorMessage="vous ne pouvez pas ajouter de commentaire vide";
            } 
        }
    } 
}
</script>

<style>
</style>