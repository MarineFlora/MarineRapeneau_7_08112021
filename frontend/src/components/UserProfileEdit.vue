<template> 
    <b-modal 
        id="modal-edit-profile" 
        title="Modifier le profil" 
        ok-title="modifier"
        cancel-title="annuler"
        centered
        @ok="editProfile"
    >
        <b-form class="px-2">
            <b-form-group label="Image de profil">
                <div class="d-flex align-items-center overflow-hidden profile-input-file">
                    <ProfileImage imageHeight="70" :imageUrl="user.profilePhoto" class="profileImage"/>
                    <input 
                        type="file" 
                        id="edit-profile-input"
                        name="image" 
                        accept=".jpg, .jpeg, .png" 
                        autocomplete=photo
                        @change="updateProfilePreview()"
                    >  
                    <label for="edit-profile-input" class="px-1 mb-0 mx-3 text-primary text-nowrap" role="button">changer l'image</label>
                </div>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-form-group label="Prénom">
                    <b-form-input 
                        v-model="form.firstName"
                        type="text" 
                        autocomplete=given-name
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Nom">
                    <b-form-input 
                        v-model="form.lastName"
                        type="text" 
                        autocomplete=family-name
                    ></b-form-input>
                </b-form-group>
            </div>

            <b-form-group label="Profession" >
                <b-form-input 
                    v-model="form.profession"
                    type="text" 
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Décrivez-vous en quelques mots">
                <b-form-input 
                    v-model="form.userDescription"
                    type="text" 
                    maxlength="250"
                ></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>    


</template> 

<script> 
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'UserProfileEdit',
    components: {
        ProfileImage
    },
    
    props: {
        user: { type: Object, default: 'user' },
        loadUserProfile: { type: Function },
    },
    data() {
        return {
            form: {
                firstName: "",
                lastName: "",
                profession: "",
                userDescription: ""
            }
        }
    },
    watch: {
        user: function() { 
            this.form.firstName = this.user.firstName;
            this.form.lastName = this.user.lastName;
            this.form.profession = this.user.profession;
            this.form.userDescription = this.user.userDescription;
        }
    },
    methods: {
        updateProfilePreview() {
            const profileImage = document.querySelector(".profileImage");
            const inputImage = document.getElementById("edit-profile-input");
            let currentFile = inputImage.files;
            profileImage.src = window.URL.createObjectURL(currentFile[0]);
        },
        editProfile() {               
            const selectedFile = document.getElementById("edit-profile-input");
            let profileImage = selectedFile.files;
            const isFormData = profileImage.length > 0;
            let body = this.form
            
            if (isFormData) {
                const formData = new FormData();
                formData.append("image", profileImage[0]);
                formData.append("user", JSON.stringify(body))
                body = formData
            }

            apiFetch
                .put(`/auth/user-profile/${this.user.id}`, body, { isFormData })
                .then(res => {
                    console.log("fetch res:", res)
                    this.loadUserProfile();
                })
                .catch(error => {
                    console.log("error:", error);
                });  
        },
        
    }
}
</script>

<style lang="scss">
.profile-input-file input {
    opacity: 0;
    order: 3;
}
</style>