<template>
<!-- height="45" pour commentaire-->
    <b-img 
        :height="imageHeight" 
        :src="require('../assets/images/LauraLoiseau.png')" 
        rounded="circle"
        alt="avatar user"
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