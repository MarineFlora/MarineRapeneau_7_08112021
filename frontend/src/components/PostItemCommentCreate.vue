<template>
    <b-row class="pl-3 mt-3">
        <ProfileImage imageHeight="40" />

        <b-form class="col ">
            <b-form-textarea                            
                placeholder="Ecrivez un commentaire" 
                rows="1"
                max-rows="10"
            ></b-form-textarea>
            
            <div class="d-flex align-items-center justify-content-between mt-2" >
                <!--  <div class="col d-flex align-items-center px-0 d-flex add-media">
                        <b-icon icon="image" font-scale="1.5"  class="text-primary"></b-icon>
                        <b-form-file v-model="file" class="mx-1 add-media upload-input" placeholder="ajouter médias" size="sm" multiple></b-form-file>
                    </div>!-->
                    <!--  VERSION de l'input file sans bootstrapvue pour design correct... à tester !-->
                    <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media">
                        <b-icon icon="image" class="text-primary"></b-icon>
                        <label for="image_uploads" class="mt-2 px-2 add-media text-secondary" title="ajouter une image ou un gif">médias</label>
                        <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                    </div> 
                    
                <BaseButton button-title="Répondre" class="col btn-sm btn-pages"/> 
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