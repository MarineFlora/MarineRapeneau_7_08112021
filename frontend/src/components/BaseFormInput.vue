<template>
    <!-- à rendre dynamique pour réutiliser ???? -->
    <b-form-group>
        <div class="input-div" id="email">
            <h6 class="text-left">Email</h6>
            <b-form-input
                @focus="addClassFocus('#email')"
                @blur="removeClassFocus('#email')"
                type="email" 
                title="email"
                class="px-4 input pt-3"
            ></b-form-input>
        </div>
    </b-form-group>
</template> 

<script> 
    export default {
        name: 'BaseFormInput'
    }
</script>

<style lang="scss">
    .input-div {
        position: relative;
    }

    .input-div.focus > h6 {
        top: 0.75rem;
        font-size: 13px;
    }

    .input-div > h6 {
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #6e6e6e;
        transition: .4s;
}
</style>