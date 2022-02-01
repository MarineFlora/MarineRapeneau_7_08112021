<template> 
    <header class="py-2 bg-dark shadow">
        <b-container class="maxwidth-header">
            <b-navbar class="px-0">
                <!-- LOGO DE GROUPOMANIA -->
                <b-navbar-brand to="/" class="mx-2">
                    <b-img 
                        height="45" 
                        :src="require('../assets/images/logo-white.svg')" 
                        alt="Groupomania logo"
                        title="accueil" 
                        class="d-sm-none d-block"
                    ></b-img>
                    <b-img 
                        height="45" 
                        :src="require('../assets/images/logo-title-white.svg')" 
                        alt="Groupomania logo" 
                        class="d-none d-sm-block" 
                    ></b-img>
                </b-navbar-brand>

                <!-- NAVIGATION APP -->
                <b-navbar-nav class="ml-auto align-items-center">
                    <!-- vers page d'accueil -->
                    <b-nav-item 
                        to="/" 
                        exact
                        @mouseover="hoverHome = true" 
                        @mouseleave="hoverHome = false" 
                        v-b-tooltip.hover.v-primary="'accueil'"
                        class="home-nav"
                    >
                        <b-icon 
                            v-if="!hoverHome && !isHomeActive" 
                            icon="house" 
                            font-scale="2.2" 
                            variant="light"
                            aria-label="accueil"
                        ></b-icon>
                        <b-icon 
                            v-if="hoverHome || isHomeActive" 
                            icon="house-fill" 
                            variant="primary" 
                            font-scale="2.2" 
                            aria-label="accueil"
                        ></b-icon>
                    </b-nav-item>

                    <!-- vers page profil -->
                    <b-nav-item 
                        to="/user-profile" 
                        @mouseover="hoverProfile = true" 
                        @mouseleave="hoverProfile = false" 
                        v-b-tooltip.hover.v-primary="'profil'"
                        class="profile-nav"
                    >
                        <b-icon 
                            v-if="!hoverProfile && !isProfileActive" 
                            icon="person" 
                            font-scale="2.2" 
                            variant="light"
                            aria-label="profil"
                        ></b-icon>
                        <b-icon 
                            v-if="hoverProfile || isProfileActive" 
                            icon="person-fill" 
                            variant="primary" 
                            font-scale="2.2" 
                            aria-label="profil"
                        ></b-icon>
                    </b-nav-item>

                    <!-- vers page à propos -->
                    <b-nav-item 
                        to="/about" 
                        @mouseover="hoverAbout = true" 
                        @mouseleave="hoverAbout = false" 
                        v-b-tooltip.hover.v-primary="'à propos'"
                        class="about-nav"
                    >
                        <b-icon 
                            v-if="!hoverAbout && !isAboutActive" 
                            icon="info-circle" 
                            font-scale="1.8" 
                            variant="light"
                            aria-label="à propos"
                        ></b-icon>
                        <b-icon 
                            v-if="hoverAbout || isAboutActive" 
                            icon="info-circle-fill" 
                            variant="primary" 
                            font-scale="1.8"
                            aria-label="à propos"
                        ></b-icon>
                    </b-nav-item>

                    <!-- vers page login -->
                    <b-nav-item v-b-tooltip.hover.v-primary="'se déconnecter'" >
                        <b-icon 
                            icon="power" 
                            font-scale="2" 
                            class="logout-icon"
                            v-b-modal.modal-logout
                            aria-label="deconnexion"
                        ></b-icon>

                        <b-modal id="modal-logout"
                            title="Deconnexion" 
                            ok-title="se déconnecter" 
                            cancel-title="annuler"
                            @ok="logOut"
                            centered
                        >
                            <p>Voulez-vous vraiment quitter votre espace personnel ?</p>
                        </b-modal>
                    </b-nav-item>
                </b-navbar-nav>

            </b-navbar> 
        </b-container>      
    </header>
</template> 

<script> 
import BaseButton from '../components/BaseButton.vue';
import router from '../router/index';
import functionsMixin from '../mixins/functionsMixin.js'

export default {
    name: 'TheHeader',
    components: {
        BaseButton,
    },
    data() {
        return {
            hoverProfile: false,
            hoverAbout: false, 
            hoverHome: false,
            isHomeActive: false,
            isProfileActive: false,
            isAboutActive: false,
            activeNavElement: false
        };
    },
    mixins: [functionsMixin],
    mounted() {
        this.homeIsActive();
        this.profileIsActive();
        this.aboutIsActive()
    },
    methods: {
        // recherche si le chemin des liens des icones correspondent à l'adresse de la page actuelle
        findRouterActive(navItem) {
            const navItemLink = document.querySelector(`${navItem} a`);
            const isActive = navItemLink.classList.contains('router-link-exact-active');
            this.activeNavElement = isActive;
        },
        // activation des icones "actives" si correspondance route to=""/adresse
        homeIsActive(){
            this.findRouterActive('.home-nav');
            this.activeNavElement ? this.isHomeActive = true : ""
        },
        profileIsActive(){
            this.findRouterActive('.profile-nav');
            this.activeNavElement ? this.isProfileActive = true : ""
        },
        aboutIsActive(){
            this.findRouterActive('.about-nav');
            this.activeNavElement ? this.isAboutActive = true : ""
        },
    }      
}
</script>

<style lang="scss">
@import "../assets/custom.scss";

header {
    border-radius: 0 0 0.8rem 0.8rem;
}

.logout-icon {
    color: $light;
    &:hover {
        color: $primary;
    }
}

/*
}
.router-link-exact-active > svg {
   //background-color: indianred;
  // cursor: pointer;
   color: $primary;
 }*/

.maxwidth-header {
    max-width: 1200px !important;
}

</style>