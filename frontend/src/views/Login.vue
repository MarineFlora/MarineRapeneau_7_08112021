<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login-page">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectionHeading sub-heading="Connectez-vous"/>

                <b-form class="form-width my-5" @submit.prevent="login" novalidate>
                    <b-form-group>
                        <div class="input-div" id="email" >
                            <label for="login-email" class="text-left">Email</label>
                            <b-form-input
                                v-model="email"
                                @focus="addClassFocus('#email')"
                                @blur="removeClassFocus('#email')"
                                type="email" 
                                class="px-4 input pt-3"
                                autocomplete="email"
                                id="login-email"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                    <div class="input-div" id="password">
                        <label for="login-password" class="text-left">Mot de passe</label>
                        <b-form-input  
                            v-model="password"
                            @focus="addClassFocus('#password')"
                            @blur="removeClassFocus('#password')"
                            type="password"
                            class="px-4 input pt-3"
                            autocomplete="current-password"
                            id="login-password"
                        ></b-form-input>
                        
                     </div>    
                    </b-form-group>
                    <p class="text-left text-danger mb-3"> {{ errorMessage }} </p>

                    <BaseButton button-title="se connecter" />
                </b-form>                           

            <p class="account-link mt-lg-4">C'est votre première visite ? </br>
            <router-link to="/signup" class="text-primary font-weight-bold"><u>Créez votre compte !</u></router-link>
            </p>
                
            </b-col>
        </b-row>
    </b-container>
</template>

<script> 
import BaseButton from '../components/BaseButton.vue';
import ConnectionHeading from '../components/ConnectionHeading.vue';
import router from '../router/index';
import { apiFetch } from '../utils/ApiFetch';
import inputAnimationMixin from '../mixins/inputAnimationMixin.js'

export default {
    name: 'Login',
    components: {
        BaseButton,
        ConnectionHeading
    },
    mixins: [inputAnimationMixin],
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    
    methods: {
        login() {
            if (this.email != '' && this.password !== '') {
                apiFetch
                    .post('/auth/login', { email : this.email, password: this.password } )
                    .then((res) => {
                        // si erreur 401 au back-end : message erreur
                        if (!res.token) {
                            this.errorMessage = res.error;
                        // sinon recupérer token pour headers auth et envoyer à la page d'accueil
                        } else {
                            localStorage.setItem('userToken', res.token);
                            localStorage.setItem('userData', JSON.stringify(res.user));
                            console.log("userToken:", res.token);  
                            router.push({ name: 'LatestPosts' }); 
                        } 
                    })
                    .catch(error => {
                        console.log(error)
                        this.errorMessage = 'Problèmes de connexion';
                    })
            } else {
                this.errorMessage = "Veuillez renseigner les champs de connexion";
            }
        },
    }
}
     
</script>

<style lang="scss"> 
    .account-link {
        font-size: 1.2rem;
        margin-bottom: 4rem;
    }

    @media (min-width: 576px) {
        .form-width {
            width: 350px;
        }
    }

</style>
