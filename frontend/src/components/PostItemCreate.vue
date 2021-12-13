<template>
    <b-row class="shadow p-3">
        <ProfileImage imageHeight="65" class="text-center px-2"/>

        <b-form class="col px-2">
            <b-form-textarea                            
                placeholder="Quoi de neuf ?"
                rows="2"
                max-rows="30"
            ></b-form-textarea>
            
            <div class="d-flex align-items-center justify-content-between mt-3" >
                <!--  <div class="col d-flex align-items-center px-0 d-flex add-media">
                    <b-icon icon="image" font-scale="1.5"  class="text-primary"></b-icon>
                    <b-form-file v-model="file" class="mx-1 add-media upload-input" placeholder="ajouter médias" size="sm" multiple></b-form-file>
                </div>!-->
                    <!--  VERSION de l'input file sans bootstrapvue pour design correct... à tester !-->
                <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media" title="ajouter une image ou un gif">
                    <b-icon icon="image" class="text-primary"></b-icon>
                    <label for="image_uploads" class="mt-2 px-2 add-media text-secondary">médias</label>
                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                </div> 
                    
                <BaseButton button-title="Publier" class="col btn-sm btn-pages"/> 
            </div>
                    
        </b-form>
    </b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'PostItemCreate',
    components: {
        BaseButton,
        ProfileImage
    } 
}
</script>

<style>
</style>