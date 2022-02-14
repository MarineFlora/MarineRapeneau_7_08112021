<template>
  <div id="app">
        
    <router-view/>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from './components/TheFooter.vue'

export default {
	name: 'App',
	components: {
		TheFooter
	}
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
}

h1 {
  font-family: 'Lora', serif;
}

h1, h2, p {
    margin: 0 !important;
}

// classes pour animations material design inputs 
.input-div {
    position: relative;
}

.input-div.focus > label {
    top: 0.75rem;
    font-size: 13px;
}

.input-div > label {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6e6e6e;
    transition: .2s;
}

// classes utilisées sur toutes les pages sauf connexion
.btn-pages {
    font-size: 1.17rem !important;
    max-width: 110px !important;
}

.modal-footer button, .modal-body button {
    border-radius: 50rem;
    font-size: 1.17rem;
    font-weight: bold;
    padding: 0.3rem 1rem;
}

.maxwidth-page {
    max-width: 720px !important;
}
</style>
