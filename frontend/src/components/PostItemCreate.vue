<template>
    <b-row class="shadow p-3">
       
        <ProfileImage imageHeight="60" class="text-center px-2"/>
        
        <b-form class="col p-2 overflow-hidden create-form" @submit.prevent="createPost" enctype="multipart/form-data">
            <b-form-textarea                            
                placeholder="Quoi de neuf ?"
                rows="2"
                max-rows="30"
                v-model="description"
            ></b-form-textarea>

            <p class="text-danger">{{ errorMessage }}</p>

            <PostInput 
                labelTitle="ajouter médias" 
                inputImageId="input-image" 
                inputImageClass="input-file" 
                previewMedia=".preview-media" 
                inputFile=".input-file" 
            />
            
            <div class="preview-media text-secondary font-italic">
            </div>   

            <div class="d-flex justify-content-end">
                <BaseButton button-title="Publier" class="btn-sm btn-pages"/> 
            </div>
            
        </b-form>
        
    </b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import PostInput from '../components/PostInput.vue';
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'PostItemCreate',
    components: {
        BaseButton,
        ProfileImage,
        PostInput
    },
    props: {
        loadPosts: { type: Function },
    },
    data() {
        return {
            description: '',
            errorMessage: ''
        }
    },
    methods: {
        createPost() { 
            const description = this.description;
            const userId = localStorage.getItem("userId");

            const inputFile = document.querySelector(".input-file");
            const images = inputFile.files;

            const form = document.querySelector(".create-form");

            if (description !== '' || images.length !== 0) { 
                this.errorMessage= '';
                const isFormData = !!images

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
                        console.log("fetch res:", res)
                        this.removePreviewChild();
                        form.reset();
                        this.loadPosts();
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