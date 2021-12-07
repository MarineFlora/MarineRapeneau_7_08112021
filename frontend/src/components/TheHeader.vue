<template> 
    <header class="py-2 bg-dark">
        <b-container>
            <b-navbar>

                <b-navbar-brand href="/" class="mx-2">
                    <b-img 
                        height="45" 
                        :src="require('../assets/images/logo-white.svg')" 
                        alt="Groupomania logo" 
                        class="d-md-none d-block"
                    ></b-img>
                    <b-img 
                        height="45" 
                        :src="require('../assets/images/logo-title-white.svg')" 
                        alt="Groupomania logo" 
                        class="d-none d-md-block" 
                    ></b-img>
                </b-navbar-brand>

                <b-navbar-nav class="ml-auto align-items-center">
                    <b-nav-item to="/user-profile">
                        <b-icon icon="person" font-scale="2.2" class="text-white"></b-icon>
                    </b-nav-item>
                    <b-nav-item to="/about">
                        <b-icon icon="info-circle" font-scale="1.8" class="text-white"></b-icon>
                    </b-nav-item>
                    <b-nav-item to="/login">
                        <b-icon icon="power" font-scale="2" class="text-white"></b-icon>
                    </b-nav-item>
                </b-navbar-nav>

            </b-navbar> 
        </b-container>      
    </header>
</template> 

<script> 
    export default {
        name: 'TheHeader',
        props: {
            
        }
    }
</script>

<style lang="scss">
header {
    border-radius: 0 0 0.8rem 0.8rem;
}
</style>