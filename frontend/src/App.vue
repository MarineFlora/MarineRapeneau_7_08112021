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
