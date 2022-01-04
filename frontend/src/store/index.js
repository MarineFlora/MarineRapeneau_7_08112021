import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
        
        updateMediaDisplay({ commit, dispatch }, { preview, inputFile }) {
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
                list.style.cssText = 'display:flex; flex-wrap:wrap; list-style:none; margin:0';
                previewMedia.appendChild(list);
                for (let i = 0; i < currentFiles.length; i++) {
                    let listItem = document.createElement('li');
                    listItem.style.cssText = 'width:100px; margin:0.3rem';
                    let fileName = document.createElement('p');
                    fileName.style.cssText = 'white-space: nowrap; overflow:hidden; text-overflow:ellipsis';

                    if (dispatch("validFileType", currentFiles[i])) {
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
        validFileType({ commit }, file) {
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
    },
    modules: {
  }
})
