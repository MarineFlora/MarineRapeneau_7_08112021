<template> 
    <footer class="py-5 bg-dark text-white"> 
        <b-link>À propos</b-link>  ·  
        <b-link>Politique de confidentialité</b-link>  </br>
        <b-link>{{ copyright }} </b-link> 
    </footer> 
</template> 

<script> 
export default {
    name: 'TheFooter',
    computed: {
		copyright() {
			const currentYear = new Date().getFullYear()
			return `${currentYear} Groupomania`
		}
	}
}
</script>

<style lang="scss">
footer {
    font-size: 0.9rem;

    a, a:hover {
        color: inherit
    }
}
</style>