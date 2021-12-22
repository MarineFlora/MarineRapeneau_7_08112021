<template>
    <b-row class="shadow p-3">
       
        <ProfileImage imageHeight="60" class="text-center px-2"/>

        <b-form class="col p-2 overflow-hidden" @submit.stop.prevent="createPost">
            <b-form-textarea                            
                placeholder="Quoi de neuf ?"
                rows="2"
                max-rows="30"
                v-model="description"
            ></b-form-textarea>
            
            
            <div class="d-flex align-items-center justify-content-start px-0 overflow-hidden mt-3" title="ajouter une image ou un gif">
                <b-icon icon="images" class="text-primary"></b-icon>
                <label for="image" class="my-0 px-2 text-secondary add-media" role="button">ajouter médias</label>
                <input 
                    type="file" 
                    id="image"
                    name="image" 
                    accept=".jpg, .jpeg, .png, .gif" 
                    class="input-file" 
                    @change="updateMediaDisplay"  
                >  
            </div>  
            
            <div class="preview-media text-secondary font-italic add-media">
                <p></p>
            </div>   

            <div class="d-flex justify-content-end">
                <BaseButton button-title="Publier" class="btn-sm btn-pages"/> 
            </div>
            
        </b-form>
    </b-row>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import ProfileImage from '../components/ProfileImage.vue';
import { apiFetch } from '../utils/ApiFetch';

export default {
    name: 'PostItemCreate',
    components: {
        BaseButton,
        ProfileImage
    },
    data() {
        return {
            description: ''
        }
    },
    methods: {
        createPost() { 
            const description = this.description;
            const userId = localStorage.getItem("userId");

            const selectedFile = document.querySelector(".input-file");
            const image = selectedFile.files[0]

            const isFormData = !!image

            let body = { 
                "userId": Number(userId),
                "description": description
            }
        
            if (isFormData) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("post", JSON.stringify(body))
            body = formData
            }

            apiFetch
                .post('/posts/', body, { isFormData })
                .then(res => {
                    console.log("fetch res:", res)
                    // rechargement des posts ?
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                    alert("Une erreur est survenue");
                });                
        },

        updateMediaDisplay() {
            const previewMedia = document.querySelector('.preview-media');
            const input = document.querySelector('.input-file');
            while(previewMedia.firstChild) {
                previewMedia.removeChild(previewMedia.firstChild);
            }

            let currentFiles = input.files;
            let filesStatus = document.createElement('p');
            if (currentFiles.length === 0) {
                filesStatus.textContent = 'aucun fichier sélectionné';
                previewMedia.appendChild(filesStatus);
            }/* // si plusieurs fichiers
            else if (currentFiles.length > 4) {
                filesStatus.textContent = 'vous ne pouvez selectionner que 4 images';
                previewMedia.appendChild(filesStatus);
            }*/
            else {
                let list = document.createElement('ul');
                list.style.cssText = 'display:flex; flex-wrap:wrap; list-style:none; margin:0';
                previewMedia.appendChild(list);
                for (let i = 0; i < currentFiles.length; i++) {
                    let listItem = document.createElement('li');
                    listItem.style.margin = '0.6rem';
                    let fileName = document.createElement('p');

                    if (this.validFileType(currentFiles[i])) {
                       fileName.textContent = currentFiles[i].name;
                        let image = document.createElement('img');
                        image.src = window.URL.createObjectURL(currentFiles[i]);
                        listItem.appendChild(image);
                        listItem.appendChild(fileName);
                    } else {
                        fileName.textContent = currentFiles[i].name + ': Format de fichier incorrect. Merci de choisir un format png, jpg, jpeg ou gif.';
                        listItem.appendChild(fileName);
                    }
                    
                    list.appendChild(listItem);
                }
            }
                    
        },
        validFileType(file) {
            const fileTypes = [
            'image/jpeg',
            'image/jpeg',
            'image/png',
            'image/gif'
            ]

            for (let i = 0; i < fileTypes.length; i++) {
                if (file.type === fileTypes[i]) {
                return true;
                }
            }
            return false;
        }
    }  
}
</script>

<style lang="scss">
.input-file {
    opacity: 0;
}

form img {
    height: 60px;
}

.add-media{
    font-size: 0.9rem;
}



</style>