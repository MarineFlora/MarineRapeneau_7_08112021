<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login-page">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectionHeading sub-heading="Connectez-vous"/>

                <b-form class="form-width my-5" @submit.stop.prevent="login" novalidate>
                    <b-form-group>
                        <!-- classe focus sera présente si propriété focusOnPassword est true (:=v-bind:)-->
                        <div class="input-div" :class="{ 'focus' : focusOnEmail }" >
                            <h6 class="text-left">Email</h6>
                            <b-form-input
                                v-model="email"
                                @focus="focusOnEmail=true"  
                                @blur="getEmailValue"
                                type="email" 
                                title="email"
                                class="px-4 pt-3"
                            ></b-form-input>
                        </div>
                    </b-form-group>

                    <b-form-group>
                    <div class="input-div" :class="{ 'focus' : focusOnPassword }" >
                        <h6 class="text-left">Mot de passe</h6>
                        <b-form-input  
                            v-model="password"
                            @focus="focusOnPassword=true"
                            @blur="getPasswordValue"
                            type="password"
                            title="password"
                            class="px-4 pt-3"
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

export default {
    name: 'LogIn',
    components: {
        BaseButton,
        ConnectionHeading
    },
    
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            focusOnPassword: false,
            focusOnEmail: false
        };
    },
    
    methods: {
        login() {
            if (this.email != '' && this.password !== '') {
               // envoi des données au back
                fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify({ email : this.email, password: this.password })
                })
                    // on récupère le token
                    .then((res) => res.json())
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
                    .catch(error => console.log(error));
            } else {
                this.errorMessage = "Veuillez renseigner les champs de connexion"
            }
        },
        getPasswordValue() {
            if (this.password == '') {
                this.focusOnPassword = false
            } 
        },
        getEmailValue() {
            if (this.email == '') {
                this.focusOnEmail = false
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
        transition: .2s;
}

</style>
