<template>
    <div class="latest-posts text-left">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <h1 class="my-4 font-weight-bold">Dernières publications</h1>
                <!-- CREER UN POST -->
                <b-row class="shadow p-3">
                    <b-img 
                        height="65" 
                        :src="require('../assets/images/LauraLoiseau.png')" 
                        rounded="circle"
                        alt="avatar user"
                        class="text-center px-2"
                    ></b-img>

                    <b-form class="col px-2">
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
                                <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media" title="ajouter une image ou un gif">
                                    <b-icon icon="image" class="text-primary"></b-icon>
                                    <label for="image_uploads" class="mt-2 px-2 add-media text-secondary">ajouter médias</label>
                                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                                </div> 
                                
                            <BaseButton button-title="Publier" class="col btn-sm btn-pages"/> 
                        </div>
                               
                    </b-form>
                </b-row>

                <!-- UNE PUBLICATION + COMMENTAIRES associés -->
                <b-card class="my-3 p-0 shadow">
                    <!-- 1 POST -->
                    <div class="pb-3 border border-left-0 border-top-0 border-right-0 ">
                        <!-- USER + TIME -->
                        <b-row class="px-3" align-v="center">
                            <b-img 
                                height="65" 
                                :src="require('../assets/images/YvesLegrand.png')" 
                                rounded="circle"
                                alt="avatar user"
                            ></b-img>
                            <div class="d-flex">
                                <div class="px-3">
                                    <h2>Yves Legrand</h2>
                                    <p class="text-secondary d-none">admin</p>
                                </div>
                                <p class="text-secondary">· 4h</p>
                            </div>
                        </b-row>
                        <!-- CONTENU PUBLICATION -->
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
                        <!-- COMMENTAIRES ET LIKES INFO-->
                        <b-row>
                            <b-col cols="9" class="d-flex align-items-center">
                                <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                                <p class="text-secondary mx-2">2 commentaires</p>
                            </b-col>

                            <b-col cols="3" class="d-flex justify-content-end align-items-center">
                                <b-icon icon="suit-heart" font-scale="1.3" title="aime ce post"></b-icon>
                                <p class="text-secondary mx-2">5</p>
                            </b-col>
                        </b-row>
                    </div>

                    <!-- COMMENTAIRES liste-->
                    <div class="border border-left-0 border-right-0 border-top-0 mt-3 px-3 comments">
                        <!-- 1 COMMENTAIRE -->
                        <b-row class="mb-3" align-v="start">
                            <b-img 
                                height="45" 
                                :src="require('../assets/images/LauraLoiseau.png')" 
                                rounded="circle"
                                alt="avatar user"
                            ></b-img>
                            <div class="px-3">
                                <div class="d-flex align-items-center">
                                    <p class="font-weight-bold pr-2">Ambre Hart</p>
                                    <b-icon icon="person-check-fill" class="text-dark pr-2 d-none" font-scale="1.5" title="admin"></b-icon>
                                    <p class="text-secondary">· 2h</p>
                                </div>
                                <p>trop cool ! :)</p>
                                <div class="d-flex align-items-center text-secondary mt-1">
                                    <b-link class="mr-4 text-secondary">Répondre</b-link>
                                    <b-icon icon="suit-heart" font-scale="0.9" title="aimer ce commentaire"></b-icon>
                                </div>
                            </div>
                        </b-row>
                        <!-- 1 COMMENTAIRE -->
                        <b-row class="mb-3" align-v="start">
                            <b-img 
                                height="45" 
                                :src="require('../assets/images/admin.png')" 
                                rounded="circle"
                                alt="avatar user"
                            ></b-img>
                            <div class="px-3">
                                <div class="d-flex align-items-center">
                                    <p class="font-weight-bold pr-2">Ambre Hart</p>
                                    <b-icon icon="person-check-fill" class="text-dark pr-2" font-scale="1.5" title="admin"></b-icon>
                                    <p class="text-secondary">· 2h</p>
                                </div>
                                <p> super!</p>
                                <div class="d-flex align-items-center text-secondary mt-1">
                                    <b-link class="mr-4 text-secondary">Répondre</b-link>
                                    <b-icon icon="suit-heart" font-scale="0.9" title="aimer ce commentaire"></b-icon>
                                </div>
                            </div>
                        </b-row>
                    </div>

                    <!-- AJOUTER UN COMMENTAIRE meme principe que creer post -->
                    <b-row class="pl-3 mt-3">
                        <b-img 
                            height="45" 
                            :src="require('../assets/images/LauraLoiseau.png')" 
                            rounded="circle"
                            alt="avatar user"
                        ></b-img>
                    
                        <b-form class="col ">
                            <b-form-textarea                            
                                placeholder="Ecrivez un commentaire" 
                                rows="1"
                                max-rows="10"
                            ></b-form-textarea>
                            
                            <div class="d-flex align-items-center justify-content-between mt-2" >
                                <!--  <div class="col d-flex align-items-center px-0 d-flex add-media">
                                        <b-icon icon="image" font-scale="1.5"  class="text-primary"></b-icon>
                                        <b-form-file v-model="file" class="mx-1 add-media upload-input" placeholder="ajouter médias" size="sm" multiple></b-form-file>
                                    </div>!-->
                                    <!--  VERSION de l'input file sans bootstrapvue pour design correct... à tester !-->
                                    <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media">
                                        <b-icon icon="image" class="text-primary"></b-icon>
                                        <label for="image_uploads" class="mt-2 px-2 add-media text-secondary" title="ajouter une image ou un gif">médias</label>
                                        <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                                    </div> 
                                    
                                <BaseButton button-title="Répondre" class="col btn-sm btn-pages"/> 
                            </div>
                        </b-form>
                    </b-row>

                </b-card>

                <!-- UNE PUBLICATION + COMMENTAIRES associés -->
                <b-card class="my-3 p-0 shadow">
                    <!-- 1 POST -->
                    <div class="pb-3 border border-left-0 border-top-0 border-right-0 ">
                        <!-- USER + TIME -->
                        <b-row class="px-3" align-v="center">
                            <b-img 
                                height="65" 
                                :src="require('../assets/images/admin.png')" 
                                rounded="circle"
                                alt="avatar user"
                            ></b-img>
                            <div class="d-flex">
                                <div class="px-3">
                                    <h2>Ambre Hart</h2>
                                    <p class="text-secondary">admin</p>
                                </div>
                                <p class="text-secondary">· 11/12/2021</p>
                            </div>
                        </b-row>
                        <!-- CONTENU PUBLICATION -->
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
                        <!-- COMMENTAIRES ET LIKES INFO-->
                        <b-row>
                            <b-col cols="9" class="d-flex align-items-center">
                                <b-icon icon="chat-square" font-scale="1.3"></b-icon>
                                <p class="text-secondary mx-2">commentaires</p>
                            </b-col>

                            <b-col cols="3" class="d-flex justify-content-end align-items-center">
                                <b-icon icon="suit-heart-fill" class="text-primary" font-scale="1.3" title="aime ce post"></b-icon>
                                <p class="text-secondary mx-2">5</p>
                            </b-col>
                        </b-row>
                    </div>

                    <!-- AJOUTER UN COMMENTAIRE meme principe que creer post -->
                    <b-row class="pl-3 mt-3">
                        <b-img 
                            height="45" 
                            :src="require('../assets/images/LauraLoiseau.png')" 
                            rounded="circle"
                            alt="avatar user"
                        ></b-img>
                    
                        <b-form class="col ">
                            <b-form-textarea                            
                                placeholder="Ecrivez un commentaire" 
                                rows="1"
                                max-rows="10"
                            ></b-form-textarea>
                            
                            <div class="d-flex align-items-center justify-content-between mt-2" >
                                <!--  <div class="col d-flex align-items-center px-0 d-flex add-media">
                                        <b-icon icon="image" font-scale="1.5"  class="text-primary"></b-icon>
                                        <b-form-file v-model="file" class="mx-1 add-media upload-input" placeholder="ajouter médias" size="sm" multiple></b-form-file>
                                    </div>!-->
                                    <!--  VERSION de l'input file sans bootstrapvue pour design correct... à tester !-->
                                    <div class="col d-flex align-items-center justify-content-start px-0 d-flex add-media">
                                        <b-icon icon="image" class="text-primary"></b-icon>
                                        <label for="image_uploads" class="mt-2 px-2 add-media text-secondary" title="ajouter une image ou un gif">médias</label>
                                        <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" multiple class="d-none">
                                    </div> 
                                    
                                <BaseButton button-title="Répondre" class="col btn-sm btn-pages"/> 
                            </div>
                        </b-form>
                    </b-row>

                </b-card>

                <b-row class="my-4">
                    <b-icon icon="arrow-clockwise" font-scale="1.5" class="mx-3"></b-icon>
                    <p >Il n’y a pas d’autres publications à afficher...</p>
                </b-row>

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
    max-width: 110px !important;
}

.maxwidth-page {
    max-width: 720px !important;
}

// classes page posts
.add-media{
    font-size: 0.9rem;
    cursor: pointer;
}

.comments p, .comments a {
    font-size: 0.9rem;
}

</style>