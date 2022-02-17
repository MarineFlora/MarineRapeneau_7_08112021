<template>
    <div class="about-page">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <!-- RETOUR ACCUEIL ET TITRE PAGE -->
                <div class="d-flex align-items-center mb-3">
                    <router-link to="/" class="text-dark arrow-link p-1"  v-b-tooltip.bottom.hover.v-primary="'retour accueil'">
                        <b-icon icon="arrow-left" font-scale="1.75"></b-icon>
                    </router-link>
                    <h1 class="my-4 mx-2 font-weight-bold">Contactez-nous</h1>
                </div>

                <!-- INFORMATIONS SUR MODERATEUR -->
                <div class="d-flex align-items-center justify-content-center">
                    <router-link :to="'/user-profile/1'">
                        <ProfileImage imageHeight="80" :imageUrl="require('../assets/images/admin.png')" alt="avatar modérateur" />
                    </router-link>
                    <div class="font-weight-bold px-3 text-left" >
                        <p class="user-name">Ambre Hart</p>
                        <p>Administratrice du réseau social</p>
                    </div>
                </div>

                <!-- DESCRIPTIF PAGE A PROPOS -->
                <b-row align-h="center" class="py-5">
                    <b-col cols="11" sm="7">
                        <p>Cette plateforme est modérée par Ambre Hart, Chargée de communication de Groupomania. <br>
                        <br>
                        Pour toutes réclamations ou demandes d’informations, veuillez remplir le formulaire ci-dessous.
                        </p>
                    </b-col>
                </b-row>   

                <!-- FORMULAIRE DE CONTACT -->
                <b-row align-h="center" class="pb-5">
                    <b-form class="form-width col-11 col-sm-7 align-items-center">
                        <!-- nom et prénom -->
                        <b-form-group>
                            <div class="input-div" id="about-name">
                                <label for="about-name-input" class="text-left">Nom et Prénom</label>
                                <b-form-input  
                                    v-model="aboutForm.name" 
                                    @focus="addClassFocus('#about-name')"
                                    @blur="removeClassFocus('#about-name')"
                                    type="text"
                                    class="px-4 input pt-3"
                                    autocomplete="name"
                                    id="about-name-input"
                                ></b-form-input>
                            </div>    
                        </b-form-group>
                        <!-- email -->
                        <b-form-group>
                            <div class="input-div" id="about-email" >
                                <label for="about-email-input" class="text-left">Email</label>
                                <b-form-input
                                    v-model="aboutForm.email" 
                                    @focus="addClassFocus('#about-email')"
                                    @blur="removeClassFocus('#about-email')"
                                    type="email" 
                                    class="px-4 input pt-3"
                                    autocomplete="email"
                                    id="about-email-input"
                                ></b-form-input>
                            </div>
                        </b-form-group>
                        <!-- post/comment signalé (non modifiable) -->
                        <b-form-group v-if="this.aboutForm.signalMessage">
                            <div class="input-div" id="about-signal" >
                                <b-form-textarea   
                                    v-model="aboutForm.signalMessage" 
                                    type="text" 
                                    class="px-4 input pt-2"                        
                                    rows="1"
                                    max-rows="6" 
                                    disabled
                                    title="post ou commentaire signalé"
                                ></b-form-textarea>
                            </div>
                        </b-form-group>
                        <!-- message -->
                        <b-form-group>
                            <div class="input-div" id="about-message" >
                                <label for="about-message-input" class="text-left">Votre Message</label>
                                <b-form-textarea   
                                    v-model="aboutForm.message" 
                                    @focus="addClassFocus('#about-message')"
                                    @blur="removeClassFocus('#about-message')"
                                    type="text" 
                                    class="px-4 input pt-3"                        
                                    rows="1"
                                    max-rows="6" 
                                    id="about-message-input"
                                ></b-form-textarea>
                            </div>
                        </b-form-group>

                        <div class="d-flex justify-content-center">
                            <BaseButton button-title="Envoyer" class="btn-pages" />
                        </div>
                    </b-form>                           
                </b-row> 
            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import ProfileImage from '../components/ProfileImage.vue';
import BaseButton from '../components/BaseButton.vue';

import router from '../router/index';
import inputAnimationMixin from '../mixins/inputAnimationMixin.js'

export default {
    name: 'AboutPage',
    components: {
        TheHeader,
        ProfileImage,
        BaseButton
    },
    mixins: [inputAnimationMixin],
    data() {
        return {
            aboutForm: {
                name: '',
                email: '',
                message: '',
                signalMessage: ''
            },
            signalType: ''
        };
    }, 
    mounted() {
        this.setSignalType()
        this.setInputMessage()
    },
    methods: {
        setInputMessage() {
            if (this.$attrs.signalToMods) {
                this.aboutForm.signalMessage = 'Signaler : ' + this.signalType + ' id: ' + this.$attrs.signalToMods.id + ', Date: ' + this.$attrs.signalToMods.createdAt + ', Contenu: "' +  this.$attrs.signalToMods.description.substring(0, 35) +'..."';
            }
        }, 
        setSignalType() {
            if (this.$attrs.type === "comment") {
                this.signalType = `dans Publication id: ${this.$attrs.signalToMods.postId}, Commentaire`
            } else {
                this.signalType = 'Publication'
            }
        }
    }
}
</script>

<style>
</style>