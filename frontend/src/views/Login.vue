<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login-page">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectionHeading sub-heading="Connectez-vous"/>

                <b-form class="form-width my-5" @submit.stop.prevent="login" novalidate>
                    <b-form-group>
                        <div class="input-div" id="email" >
                            <h6 class="text-left">Email</h6>
                            <b-form-input
                                v-model="email"
                                @focus="addClassFocus('#email')"
                                @blur="removeClassFocus('#email')"
                                type="email" 
                                title="email"
                                class="px-4 input pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                    <div class="input-div" id="password" >
                        <h6 class="text-left">Mot de passe</h6>
                        <b-form-input  
                            v-model="password"
                            @focus="addClassFocus('#password')"
                            @blur="removeClassFocus('#password')"
                            type="password"
                            title="mot de passe"
                            class="px-4 input pt-3"
                        ></b-form-input>
                        
                     </div>    
                    </b-form-group>
                    <p class="text-left text-danger"> {{ errorMessage }} </p>

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
import router from '../router/index'
import { apiFetch } from '../utils/ApiFetch'

export default {
    name: 'Login',
    components: {
        BaseButton,
        ConnectionHeading
    },
    
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
                // envoi des données au back
                apiFetch
                    .post('/auth/login', { email : this.email, password: this.password } )
                    .then((res) => {
                        // si erreur 401 au back-end : message erreur
                        if (!res.token) {
                            this.errorMessage = 'Identifiants incorrects'
                        // sinon recupérer token pour headers auth et envoyer à la page d'accueil
                        } else {
                            localStorage.setItem('userToken', res.token);
                            console.log(res.token);  
                            router.push({ name: 'LatestPosts' }); 
                        } 
                    })
                    .catch(error => {
                        console.log(error)
                        this.errorMessage = 'Problèmes de connexion'
                    })
            } else {
                this.errorMessage = "Veuillez renseigner les champs de connexion"
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
    .account-link {
        font-size: 1.2rem;
        margin-bottom: 4rem;
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
        transition: .2s;
}

</style>
