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
</style>
