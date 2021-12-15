<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 signup-page">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectionHeading sub-heading="Creez votre compte"/>

                <b-form class="form-width my-4" @submit.stop.prevent="signup" novalidate>

                    <b-form-group>
                        <div class="input-div" id="firstName">
                            <h6 class="text-left">Prénom</h6>
                            <b-form-input
                                v-model="$v.form.firstName.$model" 
                                :state="validateState('firstName')"
                                @focus="addClassFocus('#firstName')"
                                @blur="removeClassFocus('#firstName')"
                                type="text" 
                                title="Prénom"
                                class="px-4 input pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>    

                    <b-form-group>
                        <div class="input-div" id="lastName">
                            <h6 class="text-left">Nom</h6>
                            <b-form-input
                                v-model="$v.form.lastName.$model" 
                                :state="validateState('lastName')"
                                @focus="addClassFocus('#lastName')"
                                @blur="removeClassFocus('#lastName')"
                                type="text" 
                                title="Nom"
                                class="px-4 input pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <div class="input-div" id="email">
                            <h6 class="text-left">Email</h6>
                            <b-form-input
                                v-model="$v.form.email.$model" 
                                :state="validateState('email')"
                                @focus="addClassFocus('#email')"
                                @blur="removeClassFocus('#email')"
                                type="email" 
                                title="email"
                                class="px-4 input pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>
                         
                    <b-form-group>
                        <div class="input-div" id="password">
                            <h6 class="text-left">Mot de passe</h6>
                            <b-form-input  
                                v-model="$v.form.password.$model" 
                                :state="validateState('password')" 
                                @focus="addClassFocus('#password')"
                                @blur="removeClassFocus('#password')"
                                type="password"
                                title="mot de passe"
                                class="px-4 input pt-3"
                            ></b-form-input>
                            <b-form-invalid-feedback v-if="!$v.form.password.passwordValid" class="text-left">Votre mot de passe doit avoir au moins : 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>                        
                        </div>    
                    </b-form-group>

                    <p class="text-left text-danger"> {{ errorMessage }} </p>

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

import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";
import router from '../router/index';
import { apiFetch } from '../utils/ApiFetch';

// regex patterns pour validation champs
const passwordValid = helpers.regex('passwordValid', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailValid = helpers.regex('emailValid', /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
const nameValid = helpers.regex('nameValid', /^[a-z ,'-é]+$/i);

export default {
    name: 'SignUp',
    components: {
        BaseButton,
        ConnectionHeading
	},
    mixins: [validationMixin],
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            errorMessage: '',
        };
    },
    validations: {
        form: {
            firstName: {
                required,
                nameValid
            },
            lastName: {
                required,
                nameValid
            },
            email: {
                required,
                emailValid
        },
            password: {
                required,
                passwordValid
            }
        }
    },
    methods: {
        // methodes (vuelidate) pour changer le state de chaque input pour faire apparaitre la validation
        validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null; 
        },

        signup() {
            // validation des champs
            this.$v.form.$touch();
            // si au moins 1 des inputs n'est pas valide, terminer l'exécution   
            if (this.$v.form.$anyError) {
                return;
            } else {
                // sinon envoi des champs au back-end
                const userSignup = this.form;
                 apiFetch
                    .post('/auth/signup', userSignup)
                    .then((res) => {
                        console.log('token:', res.token); 
                        if (!res.token) {
                            this.errorMessage = 'Une erreur est survenue, si vous possédez déjà un compte, veuillez vous connecter'
                        } else {
                            localStorage.setItem('userToken', res.token);
                            localStorage.setItem('userId', res.userId);
                            router.push({ name: 'LatestPosts' });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.errorMessage = 'Problèmes de connexion'
                    })            
            }
        },
        // animation du titre des inputs
        // ajoute classe 'focus' au focus
        addClassFocus(element) {
            let inputDiv = document.querySelector(`${element}`);
            inputDiv.classList.add("focus");  
        },
        // enlève la classe au blur v-on:blur
        removeClassFocus(element) {
            let inputDiv = document.querySelector(`${element}`);
            let input = document.querySelector(`${element} > .input`);
            if (input.value == "") {
                inputDiv.classList.remove("focus");
            }
        }
         
    }
}
</script>

<style lang="scss">

</style>