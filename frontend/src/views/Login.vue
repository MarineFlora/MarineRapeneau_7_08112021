<template> 
  <b-container fluid class="bg-dark text-white px-6 py-4 login">
    <b-row>
        <b-col class="d-sm-flex flex-column align-items-center">
            <b-img height="45":src="require('../assets/icon-left-font-monochrome-white.svg')" alt="Groupomania logo" ></b-img>
            <h1 class="my-6">Un réseau pour nous rapprocher</h1>
            <h3 class="font-weight-bold mb-lg-4">Connectez-vous</h3>
            <b-form class="form-width">
              <b-form-group >
                  <b-form-input placeholder="Email" type="email" class="my-3 px-4" ></b-form-input>
                  <b-form-input placeholder="Mot de passe" type="text" class="my-3 px-4"></b-form-input>
                  <Button>se connecter</Button>
              </b-form-group>
            </b-form>                           

           <p class="account-link mt-lg-4">C'est votre première visite ? </br>
           <router-link to="/signup" class="text-primary font-weight-bold"><u>Créez votre compte !</u></router-link>
           </p>
            
        </b-col>
    </b-row>
  </b-container>
</template>

<script> 
import Signup from '../components/Signup.vue'
import Button from '../components/Button.vue'

export default {
  name: 'Login',
  	components: {
      Signup,
      Button
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
</style>
