<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <b-img height="45":src="require('../assets/icon-left-font-monochrome-white.svg')" alt="Groupomania logo" ></b-img>
                <h1 class="my-6">Un réseau pour nous rapprocher</h1>
                <h3 class="font-weight-bold mb-lg-4">Connectez-vous</h3>
                <b-form class="form-width my-5" @submit.stop.prevent="login" novalidate>
                    <b-form-group>
                        <div class="input-div">
                            <h6 class="text-left">Email</h6>
                            <b-form-input
                                v-model="$v.form.email.$model" 
                                :state="validateState('email')"
                                @focus="addClassFocus"
                                @blur="removeClassFocus"
                                type="email" 
                                class="px-4 input pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                    <div class="input-div">
                        <h6 class="text-left">Mot de passe</h6>
                        <b-form-input  
                            v-model="$v.form.password.$model" 
                            :state="validateState('password')" 
                            @focus="addClassFocus"
                            @blur="removeClassFocus"
                            type="password"
                            class="px-4 input pt-3"
                        ></b-form-input>
                        <b-form-invalid-feedback class="text-left">Au moins 8 caractères dont au moins </br> 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>
                     </div>    
                    </b-form-group>

                    <Button type="submit">se connecter</Button>
                </b-form>                           

            <p class="account-link mt-lg-4">C'est votre première visite ? </br>
            <router-link to="/signup" class="text-primary font-weight-bold"><u>Créez votre compte !</u></router-link>
            </p>
                
            </b-col>
        </b-row>
    </b-container>
</template>

<script> 
import Signup from '../components/Signup.vue';
import Button from '../components/Button.vue';

import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";

// regex patterns pour validation champs
const passwordValid = helpers.regex('passwordValid', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailValid = helpers.regex('emailValid', /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);

export default {
    name: 'Login',
    components: {
        Signup,
        Button
    },
    mixins: [validationMixin],
    data() {
        return {
            form: {
            email: '',
            password: ''
            }
        };
    },
    validations: {
        form: {
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
        validateState(email) {
        const { $dirty, $error } = this.$v.form[email];
        return $dirty ? !$error : null; 
        },

        validateState(password) {
        const { $dirty, $error } = this.$v.form[password];
        return $dirty ? !$error : null;
        },

        login() {
            // validation des champs
            this.$v.form.$touch();
            // si au moins 1 des inputs n'est pas valide, terminer l'exécution   
            if (this.$v.form.$anyError) {
                return;
            }
            // sinon envoyer les donnéees : to do
            alert("Form submitted!");
        },
        // ajout la classe .focus qui joue l'animation du titre
        // ajouté à écouteur v-on:focus 
        addClassFocus() {
            let inputDiv = document.querySelector(".input-div");
            inputDiv.classList.add("focus");  
        },
        // enlève la classe .focus qui joue l'animation du titre
        // ajouté à écouteur v-on:blur
        removeClassFocus() {
            let inputDiv = document.querySelector(".input-div");
            let input = document.querySelector(".input");
            if (input.value == "") {
                inputDiv.classList.remove("focus");
            }
        }
    }

}
     
</script>

<style lang="scss"> 
.account-link {
    font-size: 1.1rem;
    margin-bottom: 4rem;
}

footer {
    border-radius: 0;
}

@media (min-width: 576px) {
    .form-width {
        width: 350px;
    }
}

.input-div {
    position: relative;
}

.input-div.focus > h6 {
    top: 0.75rem;
    font-size: 13px;
}

.input-div > h6 {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6e6e6e;
    transition: .3s;
}

</style>
