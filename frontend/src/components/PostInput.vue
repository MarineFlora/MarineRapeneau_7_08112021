<template>
    <div class="d-flex align-items-center justify-content-start px-0 overflow-hidden mt-3 post-input-file" title="ajouter une image ou un gif">
        <b-icon icon="images" class="text-primary"></b-icon>
        
        <input 
            type="file" 
            :id="inputImageId"
            name="image" 
            accept=".jpg, .jpeg, .png, .gif" 
            :class="inputImageClass" 
            @change="updateMediaDisplay({
                preview:previewMedia,
                inputFile:inputFile,
            })"  
            multiple
        >  
        <label :for="inputImageId" class="my-0 px-2 text-secondary text-nowrap" role="button">{{ labelTitle }}</label>
    </div>  
</template>

<script>


export default {
    name: 'PostInput',
    components: {
        
    },
    props: {
        inputImageId: String,
        inputImageClass: String,
        labelTitle: String,
        previewMedia: String,
        inputFile: String
        
    },
    methods: {
        updateMediaDisplay({ preview, inputFile }) {
            const previewMedia = document.querySelector(preview);
            const input = document.querySelector(inputFile);
            
            while(previewMedia.firstChild) {
                previewMedia.removeChild(previewMedia.firstChild);
            }

            let currentFiles = input.files;
            let filesStatus = document.createElement('p');
            if (currentFiles.length === 0) {
                filesStatus.textContent = 'aucun fichier sélectionné';
                previewMedia.appendChild(filesStatus);
            } else if (currentFiles.length > 4) {
                filesStatus.textContent = 'vous ne pouvez selectionner que 4 images';
                previewMedia.appendChild(filesStatus);
            }
            else {
                let list = document.createElement('ul');
                list.style.cssText = 'display:flex; flex-wrap:wrap; list-style:none; margin:0; padding:0;';
                previewMedia.appendChild(list);
                for (let i = 0; i < currentFiles.length; i++) {
                    let listItem = document.createElement('li');
                    listItem.style.cssText = 'width:100px; margin:0.3rem';
                    let fileName = document.createElement('p');
                    fileName.style.cssText = 'font-size:0.9rem; white-space: nowrap; overflow:hidden; text-overflow:ellipsis';

                    if (this.validFileType(currentFiles[i])) {
                    fileName.textContent = currentFiles[i].name;
                        let image = document.createElement('img');
                        image.style.width = 'inherit';
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
.post-input-file input {
    opacity: 0;
    order: 3;
}

input:focus + label {
    box-shadow: inset 0 0 0 1px #2b2b2b;
    border-radius: 3px;
}

</style>