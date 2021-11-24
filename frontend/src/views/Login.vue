<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <ConnectHeading subHeading="Connectez-vous"/>

                <b-form class="form-width my-5" @submit.stop.prevent="login" novalidate>
                    <b-form-group>
                        <div class="input-div" id="email">
                            <h6 class="text-left">Email</h6>
                            <b-form-input
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
                            @focus="addClassFocus('#password')"
                            @blur="removeClassFocus('#password')"
                            type="password"
                            title="password"
                            class="px-4 input pt-3"
                        ></b-form-input>
                        <b-form-invalid-feedback class="text-left">identifiants invalides</b-form-invalid-feedback>
                     </div>    
                    </b-form-group>

                    <Button btnTitle="se connecter" />
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
import ConnectHeading from '../components/ConnectHeading.vue';


export default {
    name: 'Login',
    components: {
        Signup,
        Button,
        ConnectHeading
    },
    
    data() {
        return {
            email: '',
            password: '' 
        };
    },
    
    methods: {
        login() {
            // to do fetch post
           
            alert("Form submitted!");
        },
        // ajout la classe .focus qui joue l'animation du titre
        // ajouté à écouteur v-on:focus 
        addClassFocus(element) {
            let inputDiv = document.querySelector(`${element}`);
            inputDiv.classList.add("focus");  
        },
        // enlève la classe .focus qui joue l'animation du titre
        // ajouté à écouteur v-on:blur
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
        transition: .4s;
}

</style>
