<template> 
    <div>
        <b-img height="45" :src="require('../assets/images/logo-title-white.svg')" alt="Groupomania logo" ></b-img>
        <h1 class="my-6 connect-heading">Un réseau pour nous rapprocher</h1>
        <h2 class="font-weight-bold mb-lg-4">{{ subHeading }}</h2>
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
.connect-heading {
    font-size: 2.2rem;
}
</style>