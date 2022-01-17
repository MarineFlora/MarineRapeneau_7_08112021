<template>
    <b-img 
        :height="imageHeight" 
        :src="imageUrl || require('../assets/images/user-empty.png')" 
        rounded="circle"
        alt="avatar user"
        class="my-2"
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
</style>