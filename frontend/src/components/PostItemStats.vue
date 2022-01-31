<template>
    <div class="py-2 border border-left-0 border-right-0">
        <b-row>
            <b-col cols="7" class="d-flex align-items-center comments-info" @click="targetForm">
                <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                <p class="text-secondary mx-2" v-if="post.commentsCount == 0">Commenter</p>
                <p class="text-secondary mx-2" v-if="post.commentsCount > 1">{{ post.commentsCount }} commentaires</p>
                <p class="text-secondary mx-2" v-if="post.commentsCount == 1">{{ post.commentsCount }} commentaire</p>
            </b-col>

            <b-col cols="5" >
                <PostItemLike :post="post" likeScale="1.4"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import PostItemLike from './PostItemLike.vue';

export default {
    name: 'PostItemStats',
    components: { 
        PostItemLike
    }, 
    props: {
        post: { type: Object, default: ['post'] }, 
    },
    methods: {
         targetForm() {
            document.querySelector(`.comment-form-${this.post.id}`).focus();
        },
    
    }
}
</script>

