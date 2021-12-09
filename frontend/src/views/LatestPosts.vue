<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>
                <!-- CREER UN POST -->
                <b-row class="shadow p-3">
                    <b-col cols="3" sm="2" class="p-0 text-center">
                        <b-img 
                            height="65" 
                            :src="require('../assets/images/LauraLoiseau.png')" 
                            rounded="circle"
                            alt="avatar user"
                        ></b-img>
                    </b-col>

                    <b-form class="col-9 col-sm-10 px-0">
                        <b-form-textarea                            
                            placeholder="Quoi de neuf ?"
                            rows="2"
                            max-rows="30"
                        ></b-form-textarea>
                        
                        <div class="d-flex align-items-center justify-content-between mt-3" >
                              <!--  <div class="col d-flex align-items-center px-0 d-flex add-media">
                                    <b-icon icon="image" font-scale="1.5"  class="text-primary"></b-icon>
                                    <b-form-file v-model="file" class="mx-1 add-media upload-input" placeholder="ajouter médias" size="sm" multiple></b-form-file>
                                </div>!-->
                                 <!--  VERSION de l'input file sans bootstrapvue pour design correct... à tester !-->
                                <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media">
                                    <b-icon icon="image" class="text-primary"></b-icon>
                                    <label for="image_uploads" class="mt-2 px-2 add-media text-secondary">ajouter médias</label>
                                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                                </div> 
                                
                            <BaseButton button-title="Publier" class="col btn-sm btn-pages"/> 
                        </div>
                               
                    </b-form>
                </b-row>

                <!-- UNE PUBLICATION -->
                <b-card class="my-3 p-0 shadow">
                    <b-row class="px-3" align-v="center">
                        <b-img 
                            height="55" 
                            :src="require('../assets/images/YvesLegrand.png')" 
                            rounded="circle"
                            alt="avatar user"
                        ></b-img>
                        <div class="d-flex">
                            <h2 class="px-3">Yves Legrand</h2>
                            <p class="text-secondary pr-2 d-none">admin</p>
                            <p class="text-secondary">· 2h</p>
                        </div>
                    </b-row>
                    
                    <b-row>
                        <b-col class="py-3">
                            <b-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                                Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum massa
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                                Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum mass...Afficher la suite
                            </b-card-text> 
                        </b-col>   
                    </b-row>
                </b-card>


                <b-card class="my-3 p-0 shadow">
                    <b-row class="px-3" align-v="center">
                        <b-img 
                            height="55" 
                            :src="require('../assets/images/admin.png')" 
                            rounded="circle"
                            alt="avatar user"
                        ></b-img>
                        <div class="d-flex">
                            <h2 class="px-3">Amber Hart</h2>
                            <p class="text-secondary pr-2">admin</p>
                            <p class="text-secondary">· 4h</p>
                        </div>
                    </b-row>
                    
                    <b-row>
                        <b-col class="py-3">
                            <b-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                                Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum massa
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus sit amet magna eu lobortis. Quisque rhoncun tellus in tortor iaculis, non pretium ligula consequat. 
                                Ut efficitur rutrum fermentum. Cras et auctor nibh. Donec venenatis interdum mass...Afficher la suite
                            </b-card-text> 
                        </b-col>   
                    </b-row>
                </b-card>

            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import BaseButton from '../components/BaseButton.vue';

export default {
    name: 'LatestPosts',
    components: {
        TheHeader,
        BaseButton
    },
    data() {
        return {
            file: null
        }
    } 
}
</script>

<style lang="scss">

// classes utilisées sur toutes les pages sauf connexion

.btn-pages {
    font-size: 1.15rem !important;
    max-width: 120px !important;
}

.maxwidth-page {
    max-width: 720px !important;
}

// classes page posts
.add-media{
    font-size: 0.9rem;
    cursor: pointer;
}

</style>