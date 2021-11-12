<template> 
<b-container fluid class="bg-dark text-white px-6 py-4">
    <b-row>
        <b-col class="d-sm-flex flex-column align-items-center">
            <b-img height="45":src="require('../assets/icon-left-font-monochrome-white.svg')" alt="Groupomania logo" ></b-img>

            <h1 class="my-5">Un réseau pour nous rapprocher</h1>
            <h3 class="font-weight-bold">Connectez-vous</h3>
            <b-form class="form-width">
            <b-form-group >
                <b-form-input placeholder="Email" type="email" class="my-3 px-4" ></b-form-input>
                <b-form-input placeholder="Mot de passe" type="text" class="my-3 px-4"></b-form-input>
                <b-button pill variant="primary" class="btn btn-block my-3 font-weight-bold" size="lg">se connecter</b-button>
            </b-form-group>
            </b-form>                           

           <p class="account-link">C'est votre première visite ? </br>
           <a class="text-primary font-weight-bold"><u>Créez votre compte !</u></a>
           </p>

            <footer> À propos · Politique de confidentialité <br>
                2021 Groupomania</footer> <!-- reut composant, add to app.vue -->
            
        </b-col>
    </b-row>
  </b-container>
</template>

<script> 
export default {
  name: 'Login'
  
}
</script>

<style lang="scss"> 


.account-link {
  font-size: 1.1rem;
  margin-bottom: 4rem;
}

footer {
  font-size: 0.9rem;
}

h1 {
  font-family: 'Lora', serif;
}


@media (min-width: 576px) {
  .form-width {
    width: 400px; // à partir de iphone 6, en dessous pas de width
  }
}

</style>
