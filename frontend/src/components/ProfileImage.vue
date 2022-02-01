<template>
    <b-img 
        :height="imageHeight" 
        :width="imageHeight" 
        :src="imageUrl || require('../assets/images/user-empty.png')" 
        rounded="circle"
        class="image-cover"
    ></b-img>
</template>

<script>

export default {
    name: 'ProfileImage',
    components: {
        
    },
    props: {
        imageHeight: String,
        imageUrl: String
    } 
}
</script>

<style>
.image-cover{
    object-fit: cover;
    flex-shrink: 0;
}
</style>