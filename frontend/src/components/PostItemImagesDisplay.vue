<template>
    <!-- SI 1 seule image -->
    <b-row 
        align-h="center" 
        class="mb-3 post-images-list" 
        v-if="JSON.parse(post.imageUrl).length === 1" 
        v-b-modal="'modal-' +JSON.parse(post.imageUrl)[0]"
    >
        <b-img 
            :src="JSON.parse(post.imageUrl)[0]" 
            alt="" 
            class="post-image" 
            fluid 
            rounded
        ></b-img>
        <b-modal 
            :id="'modal-' +JSON.parse(post.imageUrl)[0]" 
            hide-footer 
            size="lg"
        >
            <div class="d-flex justify-content-center">
                <b-img 
                    :src="JSON.parse(post.imageUrl)[0]" 
                    alt="" 
                    class="modal-img"
                ></b-img>
            </div>
        </b-modal>
    </b-row> 

    <!-- SI 2 images cols=6-->
    <b-row 
        align-h="center" 
        class="mb-3" 
        v-else-if="JSON.parse(post.imageUrl).length === 2"
    >
        <b-col 
            cols="6" 
            class="d-flex justify-content-center p-1" 
            v-b-modal="'modal-' +JSON.parse(post.imageUrl)[0]"
        >
            <b-img 
                :src="JSON.parse(post.imageUrl)[0]" 
                alt="" 
                class="post-image" 
                fluid rounded
            ></b-img>
        </b-col>
        <b-modal 
            :id="'modal-' +JSON.parse(post.imageUrl)[0]" 
            hide-footer 
            size="lg"
        >
            <div class="d-flex justify-content-center">
                <b-img 
                    :src="JSON.parse(post.imageUrl)[0]"
                    alt="" 
                    class="modal-img"
                ></b-img>
            </div>
        </b-modal>

        <b-col 
            cols="6" 
            class="d-flex justify-content-center p-1" 
            v-b-modal="'modal-' +JSON.parse(post.imageUrl)[1]"
        >
            <b-img 
                :src="JSON.parse(post.imageUrl)[1]" 
                alt="" 
                class="post-image" 
                fluid 
                rounded
            ></b-img>
        </b-col>
        <b-modal 
            :id="'modal-' +JSON.parse(post.imageUrl)[1]" 
            hide-footer 
            size="lg"
        >
            <div class="d-flex justify-content-center">
                <b-img 
                    :src="JSON.parse(post.imageUrl)[1]" 
                    alt="" 
                    class="modal-img"
                ></b-img>
            </div>
        </b-modal>  
    </b-row>

    <!-- SI 3 images "cols" dernière image enlevé pour prendre la largeur-->
    <b-row align-h="center" class="mb-3" v-else-if="JSON.parse(post.imageUrl).length === 3">
        <b-col cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[0]">
            <b-img :src="JSON.parse(post.imageUrl)[0]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[0]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[0]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

        <b-col  cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[1]">
            <b-img :src="JSON.parse(post.imageUrl)[1]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[1]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[1]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

        <b-col class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[2]">
            <b-img :src="JSON.parse(post.imageUrl)[2]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[2]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[2]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

    </b-row>

    <!--  SI 4 images -->
    <b-row align-h="center" class="mb-3" v-else-if="JSON.parse(post.imageUrl).length === 4">
        <b-col cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[0]">
            <b-img :src="JSON.parse(post.imageUrl)[0]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[0]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[0]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

        <b-col cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[1]">
            <b-img :src="JSON.parse(post.imageUrl)[1]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[1]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[1]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

        <b-col cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[2]">
            <b-img :src="JSON.parse(post.imageUrl)[2]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[2]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[2]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>

        <b-col cols="6" class="d-flex justify-content-center p-1" v-b-modal="'modal-' +JSON.parse(post.imageUrl)[3]">
            <b-img :src="JSON.parse(post.imageUrl)[3]" alt="" class="post-image" fluid rounded></b-img>
        </b-col>
        <b-modal :id="'modal-' +JSON.parse(post.imageUrl)[3]" hide-footer size="lg">
            <div class="d-flex justify-content-center">
                <b-img :src="JSON.parse(post.imageUrl)[3]" alt="" class="modal-img"></b-img>
            </div>
        </b-modal>       
    </b-row>
       
</template>

<script>

export default {
    name: 'PostItemImagesDisplay',
    components: {
      
    },
    props: ['post'],
 /*  mounted() {
       this.displayPostImages();
   },
   methods: {
       // ajouter les élements dans la fonction pour pouvoir faire un boucle ?
       displayPostImages() {
           let imageList = document.querySelector('.post-images-list');
           if(JSON.parse(post.imageUrl).length === 2) {
               let imageCol = document.createEmlement('b-col')
           }
       }
   } */
}
</script>

<style lang="scss">
.post-image {
    max-height: 25rem;
    object-fit: cover;
}

.modal-img {
    object-fit: contain;
    width: 100%;
    max-height: 510px;
}

@media (max-width: 576px) {
    .post-image {
        max-height: 20rem;
    }
}
</style>