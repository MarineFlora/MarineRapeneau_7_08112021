<template>
    <div>
        <!-- DISPOSITION DES IMAGES DANS LES POSTS SI PLUS D'1 IMAGE -->
        <b-row align-h="center" class="mb-3" v-if="imageUrl.length > 1" >
            <b-col cols="6" class="p-1 d-flex justify-content-center image-col" v-for="value in imageUrl" :key="value">
                <b-img 
                    :src="value" 
                    alt="" 
                    class="post-image" 
                    fluid
                    rounded 
                    v-b-modal="'modal-' +value"
                ></b-img>

                <b-modal 
                    :id="'modal-' +value" 
                    hide-footer 
                    size="lg"
                >
                    <div class="d-flex justify-content-center">
                        <b-img :src="value" alt="" class="modal-img"></b-img>
                    </div>
                </b-modal>
            </b-col>
        </b-row>

        <!-- DISPOSITION SI 1 SEULE IMAGE PARTAGEE -->
        <b-row align-h="center" class="mb-3" v-else >
            <b-col class="p-1 d-flex justify-content-center">
                <b-img 
                    :src="imageUrl[0]" 
                    alt="" 
                    class="post-image" 
                    fluid
                    rounded 
                    v-b-modal="'modal-' +imageUrl[0]"
                ></b-img>

                <b-modal 
                    :id="'modal-' +imageUrl[0]" 
                    hide-footer 
                    size="lg"
                >
                    <div class="d-flex justify-content-center">
                        <b-img :src="imageUrl[0]" alt="" class="modal-img"></b-img>
                    </div>
                </b-modal>
            </b-col>
        </b-row>

    </div>
</template>

<script>

export default {
    name: 'PostItemImagesDisplay',
    data() {
        return {
           imageUrl: JSON.parse(this.post.imageUrl),
        }
    },
    props: {
        post: { type: Object, default: ['post'] },
    },
    
}
</script>

<style lang="scss">
.post-image {
    max-height: 20rem;
    object-fit: contain;
}

.modal-img {
    object-fit: contain;
    width: 100%;
    max-height: 30rem;
}

@media (max-width: 576px) {
    .post-image {
        max-height: 15rem;
    }
}
</style>