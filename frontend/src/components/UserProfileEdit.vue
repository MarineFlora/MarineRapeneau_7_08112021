<template> 
    <b-modal 
        id="modal-profile" 
        title="Modifier le profil" 
        ok-title="modifier"
        cancel-title="annuler"
        centered
    >
        <b-form class="px-2">
            <b-form-group label="Image de profil">
                <div class="d-flex align-items-center overflow-hidden profile-input-file">
                    <ProfileImage imageHeight="70" :imageUrl="user.profilePhoto" class="profileImage"/>
                    <input 
                        type="file" 
                        id="editProfileInput"
                        name="image" 
                        accept=".jpg, .jpeg, .png" 
                        @change="updateProfilePreview()"
                    >  
                    <label for="editProfileInput" class="px-1 mb-0 mx-3 text-primary text-nowrap" role="button">changer l'image</label>
                </div>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-form-group label="Prénom">
                    <b-form-input :placeholder="user.firstName"></b-form-input>
                </b-form-group>

                <b-form-group label="Nom">
                    <b-form-input :placeholder="user.lastName"></b-form-input>
                </b-form-group>
            </div>

            <b-form-group label="Profession" >
                <b-form-input :placeholder="user.profession"></b-form-input>
            </b-form-group>

            <b-form-group label="Décrivez-vous en quelques mots">
                <b-form-input :placeholder="user.userDescription"></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>    


</template> 

<script> 
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'UserProfileEdit',
    components: {
        ProfileImage
    },
    props: {
        user: { type: Object, default: 'user' },
    },
    methods: {
        updateProfilePreview(){
            const profileImage = document.querySelector(".profileImage");
            const inputImage = document.getElementById("editProfileInput");
            let currentFile = inputImage.files;
            profileImage.src = window.URL.createObjectURL(currentFile[0]);
        }
    }
}
</script>

<style lang="scss">
.profile-input-file input {
    opacity: 0;
    order: 3;
}
</style>