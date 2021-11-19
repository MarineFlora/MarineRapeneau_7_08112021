<template>
  <div id="app">
        
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
	name: 'App',
	components: {
		Footer
	}
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
}

h1 {
  font-family: 'Lora', serif;
}
</style>
