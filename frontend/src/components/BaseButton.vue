<template> 
    <b-button pill type="submit" variant="primary" class="btn btn-block font-weight-bold" size="lg">
    {{ buttonTitle }}
    </b-button>
</template> 

<script> 
    export default {
        name: 'BaseButton',
        props: {
            buttonTitle: String
        }
    }
</script>

<style lang="scss">

</style>