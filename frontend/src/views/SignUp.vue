<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 signup-page">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectionHeading sub-heading="Creez votre compte"/>

                <b-form class="form-width my-4" @submit.prevent="signup" novalidate>

                    <b-form-group>
                        <div class="input-div" id="firstName">
                            <h6 class="text-left">Prénom</h6>
                            <b-form-input
                                v-model="$v.signupForm.firstName.$model" 
                                :state="validateStateSignUp('firstName')"
                                @focus="addClassFocus('#firstName')"
                                @blur="removeClassFocus('#firstName')"
                                type="text" 
                                class="px-4 input pt-3"
                                autocomplete="given-name"
                            ></b-form-input>
                        </div>
                    </b-form-group>    

                    <b-form-group>
                        <div class="input-div" id="lastName">
                            <h6 class="text-left">Nom</h6>
                            <b-form-input
                                v-model="$v.signupForm.lastName.$model" 
                                :state="validateStateSignUp('lastName')"
                                @focus="addClassFocus('#lastName')"
                                @blur="removeClassFocus('#lastName')"
                                type="text" 
                                class="px-4 input pt-3"
                                autocomplete="family-name"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <div class="input-div" id="email">
                            <h6 class="text-left">Email</h6>
                            <b-form-input
                                v-model="$v.signupForm.email.$model" 
                                :state="validateStateSignUp('email')"
                                @focus="addClassFocus('#email')"
                                @blur="removeClassFocus('#email')"
                                type="email" 
                                class="px-4 input pt-3"
                                autocomplete="email"
                            ></b-form-input>
                        </div>
                    </b-form-group>
                         
                    <b-form-group>
                        <div class="input-div" id="password">
                            <h6 class="text-left">Mot de passe</h6>
                            <b-form-input  
                                v-model="$v.signupForm.password.$model" 
                                :state="validateStateSignUp('password')" 
                                @focus="addClassFocus('#password')"
                                @blur="removeClassFocus('#password')"
                                type="password"
                                class="px-4 input pt-3"
                                autocomplete="new-password"
                            ></b-form-input>
                            <b-form-invalid-feedback v-if="!$v.signupForm.password.passwordValid" class="text-left">Votre mot de passe doit avoir au moins : 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>                        
                        </div>    
                    </b-form-group>

                    <p class="text-left text-danger mb-3"> {{ errorMessage }} </p>

                    <BaseButton button-title="s'inscrire"/>
                    
                </b-form>                           

                <p class="account-link mt-lg-4">Déjà inscrit ? </br>
                <router-link to="/login" class="text-primary font-weight-bold"><u>Connectez-vous !</u></router-link>
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
import inputsValidationMixin from '../mixins/inputsValidationMixin.js'

export default {
    name: 'SignUp',
    components: {
        BaseButton,
        ConnectionHeading
	},
    mixins: [inputAnimationMixin, inputsValidationMixin],
    data() {
        return {
            signupForm: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            errorMessage: '',
        };
    },
    methods: {
        signup() {
            // validation des champs
            this.$v.signupForm.$touch();
            // si au moins 1 des inputs n'est pas valide, terminer l'exécution   
            if (this.$v.signupForm.$anyError) {
                return;
            } else {
                // sinon envoi des champs au back-end
                const userSignup = this.signupForm;
                    apiFetch
                        .post('/auth/signup', userSignup)
                        .then((res) => {
                            console.log('token:', res.token); 
                            if (!res.token) {
                                this.errorMessage = 'Une erreur est survenue, si vous possédez déjà un compte, veuillez vous connecter'
                            } else {
                                localStorage.setItem('userToken', res.token);
                                localStorage.setItem('userData', JSON.stringify(res.user));
                                router.push({ name: 'LatestPosts' });
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.errorMessage = 'Problèmes de connexion'
                        })            
            }
        },         
    },
}
</script>

<style lang="scss">

</style>