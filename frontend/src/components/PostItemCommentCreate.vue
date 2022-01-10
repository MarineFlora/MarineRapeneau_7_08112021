<template>
    <b-row class="pl-3 mt-3">
        <ProfileImage imageHeight="40" />

        <b-form class="col ">
            <b-form-textarea                            
                placeholder="Ecrivez un commentaire" 
                rows="1"
                max-rows="10"
            ></b-form-textarea>

            <div class="d-flex justify-content-end mt-3">
                <BaseButton button-title="Répondre" class="btn-sm btn-pages"/> 
            </div>
        </b-form>
</b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'PostItemCommentCreate',
    components: {
        BaseButton,
        ProfileImage
    } 
}
</script>

<style>
</style>