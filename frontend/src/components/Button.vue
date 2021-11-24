<template> 
    <b-button pill type="submit" variant="primary" class="btn btn-block my-3 font-weight-bold" size="lg">
    {{ btnTitle }}
    </b-button>
</template> 

<script> 
    export default {
        name: 'Button',
        props: {
            btnTitle: String
        }
    }
</script>

<style lang="scss">

</style>