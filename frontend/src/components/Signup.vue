<template> 
    <b-container fluid class="bg-dark text-white px-6 py-4 login">
        <b-row>
            <b-col class="d-sm-flex flex-column align-items-center">
                <b-img height="45":src="require('../assets/icon-left-font-monochrome-white.svg')" alt="Groupomania logo" ></b-img>
                <h1 class="my-6">Un réseau pour nous rapprocher</h1>
                <h3 class="font-weight-bold mb-lg-4">Créez votre compte</h3>
                <b-form class="form-width">
                    <b-form-group >
                        <b-form-input placeholder="Prénom" type="text" class="my-3 px-4"></b-form-input>
                        <b-form-input placeholder="Nom" type="text" class="my-3 px-4"></b-form-input>
                        <b-form-input placeholder="Email" type="email" class="my-3 px-4" ></b-form-input>
                        <b-form-input placeholder="Mot de passe" type="text" class="my-3 px-4"></b-form-input>
                        <Button>s'inscrire</Button>
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

export default {
    name: 'Signup',
    components: {
        Button
	}
}
</script>

<style lang="scss">

</style>