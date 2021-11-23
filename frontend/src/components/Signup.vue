<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <b-img height="45":src="require('../assets/icon-left-font-monochrome-white.svg')" alt="Groupomania logo" ></b-img>
                <h1 class="my-6">Un réseau pour nous rapprocher</h1>
                
                <h3 class="font-weight-bold mb-lg-4">Créez votre compte</h3>

                <b-form class="form-width my-4" @submit.stop.prevent="signup" novalidate>
                    <b-form-group>
                        <b-form-input 
                            v-model="$v.form.firstName.$model" 
                            :state="validateState('firstName')"
                            placeholder="Prénom" 
                            type="text" 
                            class="mb-3 px-4"
                        ></b-form-input>

                        <b-form-input 
                            v-model="$v.form.lastName.$model" 
                            :state="validateState('lastName')"
                            placeholder="Nom" 
                            type="text" 
                            class="mb-3 px-4"
                        ></b-form-input>

                        <b-form-input
                                v-model="$v.form.email.$model" 
                                :state="validateState('email')"
                                type="email" 
                                title="email"
                                placeholder="Email"
                                class="mb-3 px-4"
                            ></b-form-input>

                        <b-form-input  
                            v-model="$v.form.password.$model" 
                            :state="validateState('password')" 
                            type="password"
                            title="password"
                            placeholder="Mot de passe"
                            class="mb-3 px-4"
                        ></b-form-input>
                        <b-form-invalid-feedback class="text-left">Mot de passe : Au moins 8 caractères dont au moins </br> 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>

                        <Button type="submit">s'inscrire</Button>
                    </b-form-group>
                </b-form>                           

                <p class="account-link mt-lg-4">Déjà inscrit ? </br>
                <router-link to="/login" class="text-primary font-weight-bold"><u>Connectez-vous !</u></router-link>
                </p>
                
            </b-col>
        </b-row>
    </b-container>
</template> 

<script> 
import Button from './Button.vue'

import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";

// regex patterns pour validation champs
const passwordValid = helpers.regex('passwordValid', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailValid = helpers.regex('emailValid', /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
const nameValid = helpers.regex('nameValid', /[A-Za-z][A-Za-z' -]*/);

export default {
    name: 'Signup',
    components: {
        Button
	},
    mixins: [validationMixin],
    data() {
        return {
            form: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
            }
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
            }
            // sinon envoyer les donnéees : to do
            alert("Form submitted!");
        }
    }
}
</script>

<style lang="scss">

</style>