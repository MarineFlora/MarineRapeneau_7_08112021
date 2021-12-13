<template>
    <b-img 
        :height="imageHeight" 
        :src="require('../assets/images/user-empty.png')" 
        rounded="circle"
        alt="avatar user"
        class="mb-2"
    ></b-img>
</template>

<script>

export default {
    name: 'ProfileImage',
    components: {
        
    },
    props: {
        imageHeight: String
    } 
}
</script>

<style>
</style>