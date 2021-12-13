<template>
    <b-col cols="3" class="d-flex justify-content-end align-items-center">
        <div class="like">
            <transition name="like-fill" mode="out-in">
                <b-icon 
                    icon="suit-heart" 
                    :font-scale="likeScale" 
                    title="liker" 
                    class="like-icon" 
                    v-if="!liked" key="1"
                    @click="liked = true"
                ></b-icon>
                <b-icon 
                    icon="suit-heart-fill" 
                    :font-scale="likeScale" 
                    title="enlever le like" 
                    variant="primary"
                    class="like-icon" 
                    v-else="" key="2"
                    @click="liked = false"
                ></b-icon>  
            </transition>
        </div>
        <p class="text-secondary mx-2">{{ likesCount }}</p>
    </b-col>
</template>

<script>

export default {
    name: 'PostItemLike',
    components: {
        
    },
    props: {
        likeScale: String
    },
    data() {
        return {
            liked: false,
            likesCount: null
        }
    },
    
}
</script>

<style lang="scss">

.like-fill-enter-active, .like-fill-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.like-fill-enter, .like-fill-leave-active {
  opacity: 0;
}

.like-icon { 
    cursor: pointer;
}

</style>