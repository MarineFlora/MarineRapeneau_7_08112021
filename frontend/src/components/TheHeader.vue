<template> 
    <header class="py-2 bg-dark shadow">
        <b-container>
            <b-navbar>

                <b-navbar-brand href="/" class="mx-2">
                    <b-img 
                        height="45" 
                        :src="require('../assets/images/logo-white.svg')" 
                        alt="Groupomania logo"
                        title="accueil" 
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
                    <b-nav-item to="/user-profile" @mouseover="hoverProfile = true" @mouseleave="hoverProfile = false">
                        <b-icon 
                            v-if="!hoverProfile" 
                            icon="person" 
                            font-scale="2.2" 
                            class="text-white"
                        ></b-icon>
                        <b-icon 
                            v-if="hoverProfile" 
                            icon="person-fill" 
                            variant="primary" 
                            font-scale="2.2" 
                            title="profil"
                        ></b-icon>
                    </b-nav-item>

                    <b-nav-item to="/about" @mouseover="hoverInfo = true" @mouseleave="hoverInfo = false">
                        <b-icon 
                            v-if="!hoverInfo" 
                            icon="info-circle" 
                            font-scale="1.8" 
                            class="text-white"
                        ></b-icon>
                        <b-icon 
                            v-if="hoverInfo" 
                            icon="info-circle-fill" 
                            variant="primary" 
                            font-scale="1.8" 
                            title="à propos"
                        ></b-icon>
                    </b-nav-item>

                    <b-nav-item to="/login">
                        <b-icon 
                            icon="power" 
                            font-scale="2" 
                            class="logout-icon"
                            title="se deconnecter"
                        ></b-icon>
                    </b-nav-item>
                </b-navbar-nav>

            </b-navbar> 
        </b-container>      
    </header>
</template> 

<script> 
    export default {
        name: 'TheHeader',
        data() {
            return {
                hoverProfile: false,
                hoverInfo: false, 
            };
        }        
    }
</script>

<style lang="scss">
header {
    border-radius: 0 0 0.8rem 0.8rem;
}

.logout-icon {
    color: #fff;
    &:hover {
        color: #d1515a;
    }
}

</style>