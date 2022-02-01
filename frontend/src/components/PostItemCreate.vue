<template>
    <b-row class="shadow p-3 ">
    
        <router-link :to="'/user-profile'" class="py-1">
            <ProfileImage imageHeight="60" :imageUrl="userData.profilePhoto"/>
        </router-link>
        
        <b-form class="col overflow-hidden create-form py-1" @submit.prevent="createPost" enctype="multipart/form-data">
            <b-form-textarea                            
                placeholder="Quoi de neuf ?"
                rows="2"
                max-rows="30"
                v-model="description"
                title="ajouter une publication"
            ></b-form-textarea>

            <p class="text-danger">{{ errorMessage }}</p>

            <PostInput 
                labelTitle="ajouter médias" 
                inputImageId="input-image" 
                inputImageClass="input-file" 
                previewMedia=".preview-media" 
                inputFile=".input-file" 
            />
            
            <!-- emplacement du retour médias selectionnés -->
            <div class="preview-media text-secondary font-italic">
            </div>   

            <div class="d-flex justify-content-end">
                <BaseButton button-title="Publier" class="btn-sm btn-pages" /> 
            </div>
            
        </b-form>
        
    </b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import PostInput from '../components/PostInput.vue';
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';
import { eventBus } from "../main.js";

export default {
    name: 'PostItemCreate',
    components: {
        BaseButton,
        ProfileImage,
        PostInput
    },
    data() {
        return {
            description: '',
            errorMessage: '',
            userData: JSON.parse(localStorage.getItem("userData"))
        }
    },
    methods: {
        createPost() { 
            const description = this.description;
            const userId = this.userData.id;

            const inputFile = document.querySelector(".input-file");
            const images = inputFile.files;

            const form = document.querySelector(".create-form");

            if (description !== '' || images.length !== 0) { 
                this.errorMessage= '';
                const isFormData = images.length > 0; 

                let body = { 
                    "userId": Number(userId),
                    "description": description
                }

                if (isFormData) {
                const formData = new FormData();
                for (let i = 0; i < images.length; i++) {
                    formData.append("image", images[i]);
                }
                formData.append("post", JSON.stringify(body))
                body = formData
                }

                apiFetch
                    .post('/posts/', body, { isFormData })
                    .then(res => {
                        this.removePreviewChild();
                        this.description = "";
                        form.reset();
                        eventBus.$emit('loadPosts');
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorMessage="une erreur est survenue";
                    });  
            }
            else {
                this.errorMessage="vous ne pouvez pas créer une publication vide";
            }              
        },

        removePreviewChild() {
            const previewMedia = document.querySelector('.preview-media');
            while(previewMedia.firstChild) {
                previewMedia.removeChild(previewMedia.firstChild);
            }
        },
         
    }  
}
</script>

<style lang="scss">

</style>