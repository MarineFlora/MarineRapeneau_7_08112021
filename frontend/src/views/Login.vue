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
                        <b-form-invalid-feedback class="text-left">identifiants invalides</b-form-invalid-feedback>
                     </div>    
                    </b-form-group>

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
            focusOnPassword: false,
            focusOnEmail: false
        };
    },
    
    methods: {
        login() {
            // to do fetch post
           // if rien dans input ne rien faire sinon envoyer
            alert("Form submitted login!");
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
        transition: .4s;
}

</style>
