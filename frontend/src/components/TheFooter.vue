<template> 
    <footer class="pt-3 pb-4 bg-dark text-white"> 
        <p>À propos · Politique de confidentialité </br>
        {{ copyright }} </p> 
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
}
</style>