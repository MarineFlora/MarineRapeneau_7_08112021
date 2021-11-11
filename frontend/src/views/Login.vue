<template> 
<div class="page-container">
    <b-row>
        <b-col>
            <img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white.svg"/>
            <h1>Un réseau pour nous rapprocher</h1>
            <h2>Connectez-vous</h2>
            
            <div>
                <b-form-group>
                    <b-form-input placeholder="Email" type="text"></b-form-input>
                    <b-form-input placeholder="Mot de passe" type="text"></b-form-input>
                </b-form-group>
            </div>

           <p>C'est votre première visite ?</p>
           <p>Créez votre compte !</p>

            
        </b-col>
    </b-row>
  </div>
</template>

<script> 
export default {
  name: 'Login'
  
}
</script>

<style lan="scss"> 
.page-container {
    background: #091f43;
    color: #ffffff;
}

</style>
