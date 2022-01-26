<template> 
    <b-modal 
        id="modal-edit-profile" 
        title="Modifier le profil" 
        ok-title="modifier"
        cancel-title="annuler"
        centered
        @ok="editProfile"
        @cancel="resetForm"
    >
        <b-form class="px-2">
            <b-form-group label="Image de profil">
                <div class="d-flex align-items-center overflow-hidden profile-input-file">
                    <ProfileImage imageHeight="70" :imageUrl="profilePhoto" class="profileImage"/>
                    <input 
                        type="file" 
                        id="edit-profile-input"
                        name="image" 
                        accept=".jpg, .jpeg, .png" 
                        autocomplete="photo"
                        @change="updateProfilePreview()"
                    >  
                    <label for="edit-profile-input" class="px-1 mb-0 mx-3 text-primary text-nowrap" role="button">changer l'image</label>
                </div>
            </b-form-group>

            <div class="d-flex justify-content-between">
                <b-form-group>
                    <div class="input-div mr-2" id="edit-firstName" >
                        <h6 class="text-left">Prénom</h6>
                        <b-form-input
                            v-model="form.firstName"
                            @focus="addClassFocus('#edit-firstName')"
                            @blur="removeClassFocus('#edit-firstName')"
                            type="text" 
                            class="px-4 input pt-3"
                            autocomplete="given-name"
                            autofocus
                        ></b-form-input>
                    </div>
                </b-form-group>

                <b-form-group>
                    <div class="input-div" id="edit-lastName" >
                        <h6 class="text-left">Nom</h6>
                        <b-form-input
                            v-model="form.lastName"
                            @focus="addClassFocus('#edit-lastName')"
                            @blur="removeClassFocus('#edit-lastName')"
                            type="text" 
                            class="px-4 input pt-3"
                            autocomplete="family-name"
                            autofocus
                        ></b-form-input>
                    </div>
                </b-form-group>
            </div>

            <b-form-group>
                <div class="input-div" id="edit-profession" >
                    <h6 class="text-left">Profession</h6>
                    <b-form-input
                        v-model="form.profession"
                        @focus="addClassFocus('#edit-profession')"
                        @blur="removeClassFocus('#edit-profession')"
                        type="text" 
                        class="px-4 input pt-3"
                        autocomplete="family-name"
                        autofocus
                    ></b-form-input>
                </div>
            </b-form-group>
           
            <b-form-group>
                <div class="input-div" id="edit-description" >
                    <h6 class="text-left">Décrivez-vous en quelques mots</h6>
                    <b-form-input
                        v-model="form.userDescription"
                        @focus="addClassFocus('#edit-description')"
                        @blur="removeClassFocus('#edit-description')"
                        type="text" 
                        class="px-4 input pt-3"
                        maxlength="250"
                        autofocus
                    ></b-form-input>
                </div>
            </b-form-group>
        
        </b-form>
   
    </b-modal>    

</template> 

<script> 
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';
import inputAnimationMixin from '../mixins/inputAnimationMixin.js';
import { eventBus } from "../main.js";

export default {
    name: 'MyProfileEdit',
    components: {
        ProfileImage
    },
    mixins: [inputAnimationMixin],
    props: {
        user: { type: Object, default: 'user' },
    },
    data() {
        return {
            profilePhoto: "",
            form: {
                firstName: "",
                lastName: "",
                profession: "",
                userDescription: ""
            },
        }
    },
    watch: {
        // retour des infos dans les inputs modifiables
        user: function() { 
            this.getUserData();
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
                    if(!res.error) {
                        localStorage.setItem('userData', JSON.stringify(res.user));
                    }
                    // mise à jour des données affiachées sur la page
                    eventBus.$emit('forceRerenderCommentCreate');
                    eventBus.$emit('loadUserProfile');
                    eventBus.$emit('loadPosts');
                    eventBus.$emit('loadPostComments');
                })
                .catch(error => {
                    console.log("error:", error);
                });  
        },
        getUserData() {
            this.profilePhoto = this.user.profilePhoto;
            this.form.firstName = this.user.firstName;
            this.form.lastName = this.user.lastName;
            this.form.profession = this.user.profession;
            this.form.userDescription = this.user.userDescription;
        },
        resetForm() {
            this.getUserData();
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