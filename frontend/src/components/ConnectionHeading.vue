<template> 
    <div>
        <b-img height="45" :src="require('../assets/images/logo-title-white.svg')" alt="Groupomania logo" ></b-img>
        <h1 class="my-6">Un réseau pour nous rapprocher</h1>
        <h3 class="font-weight-bold mb-lg-4">{{ subHeading }}</h3>
    </div>
</template> 

<script> 
    export default {
        name: 'ConnectionHeading',
        props: {
            subHeading: String
        }
    }
</script>

<style lang="scss">

</style>