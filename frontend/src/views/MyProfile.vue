<template>
    <div class="my-profile">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
            
                <UserProfileInfos userPageTitle="Mon Profil :" :userId="this.userData.id"  @userInfos="updateUserInfos" />

                <div class="d-flex flex-column align-items-center">
                    <!--edition du profil -->
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-edit-profile class="my-2" />
                    </div>
                    <MyProfileEdit :user="user" />
                </div>  

                <div class="d-flex flex-column align-items-end mt-4 mb-5">
                    <div>
                        <b-icon 
                            icon="shield-lock-fill" 
                            font-scale="1.2" 
                        ></b-icon>
                        <b-link class="text-dark pl-1" @click="showAccountParams">Modifier les paramètres du compte</b-link>
                    </div>

                    <!-- lien changer password  -->
                    <b-link class="text-dark font-italic" v-b-modal.modal-change-password v-show="accountParams">changer votre mot de passe</b-link>

                    <b-modal 
                        id="modal-change-password" 
                        title="Changer de mot de passe" 
                        ok-title="Enregistrer"
                        centered
                        @ok.prevent="changePassword()"
                    >

                        <b-form class="px-2" >

                            <b-form-group >
                                <div class="input-div" id="current-password">
                                    <h6 class="text-left">Mot de passe actuel</h6>
                                    <b-form-input  
                                        v-model="$v.passwordChangeForm.currentPassword.$model" 
                                        
                                        @focus="addClassFocus('#current-password')"
                                        @blur="removeClassFocus('#current-password')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="current-password"
                                    
                                    ></b-form-input> 
                              
                                  <b-form-invalid-feedback class="text-left">Mot de passe saisi incorrect</b-form-invalid-feedback> 
                                </div>    
                            </b-form-group>

                            <b-form-group>
                                <div class="input-div" id="new-password">
                                    <h6 class="text-left">Nouveau mot de passe</h6>
                                    <b-form-input  
                                        v-model="$v.passwordChangeForm.newPassword.$model" 
                                        :state="validateStatePasswordChange('newPassword')"
                                        @focus="addClassFocus('#new-password')"
                                        @blur="removeClassFocus('#new-password')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="new-password"
                                        
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPassword.passwordValid" class="text-left">Votre mot de passe doit avoir au moins : <br>
                                    - 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>  
                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPassword.notSameAsCurrent" class="text-left">Votre mot de passe doit être différent de votre ancien mot de passe</b-form-invalid-feedback>         
                                </div>    
                            </b-form-group>

                            <b-form-group>
                                <div class="input-div" id="new-password-confirm">
                                    <h6 class="text-left">Confirmer le mot de passe</h6>
                                    <b-form-input  
                                        v-model="passwordChangeForm.newPasswordConfirm" 
                                        :state="validateStatePasswordChange('newPasswordConfirm')"
                                        @focus="addClassFocus('#new-password-confirm')"
                                        @blur="removeClassFocus('#new-password-confirm')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="new-password"
                                       
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPasswordConfirm.sameAsPassword" class="text-left">Les mots de passe ne correspondent pas.</b-form-invalid-feedback>         
                                </div>    
                            </b-form-group>

                        </b-form>  
                         
                        <p class="mb-5">Vous devrez vous reconnecter après la modification de votre mot de passe.</p>

                        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
                            Votre mot de passe a bien été mis à jour. <br>
                            Vous allez être redirigé vers la page de connexion...
                        </b-alert>

                    </b-modal>

                    <!-- lien supprimer le compte -->
                    <b-link class="text-dark font-italic" v-b-modal.modal-user-remove v-if="accountParams"> supprimer le compte</b-link>

                    <!-- confirmation de suppression -->
                    <b-modal 
                        id="modal-user-remove" 
                        title="Voulez-vous vraiment supprimer votre profil ?" 
                        hide-footer
                        centered
                    >
                        <p class="mb-5">Le profil sera supprimé définitivement. </p>
                        <div class="d-flex justify-content-end">
                            <b-button 
                                v-b-modal.modal-user-remove-2 
                                variant="primary"
                            >oui, je supprime mon compte</b-button>
                        </div>
                    </b-modal>

                    <b-modal 
                        id="modal-user-remove-2" 
                        title="Toujours sûr de vouloir nous quitter ?" 
                        hide-footer
                        centered
                    >
                        <p class="mb-5">Il est encore temps de faire marche arrière... <br>
                        Pour supprimer définitivement votre compte, cliquez sur "supprimer".</p> 
                        <div class="d-flex justify-content-end">
                            <b-button 
                                v-b-modal.modal-user-remove-3 
                                variant="primary" 
                                @click="deleteProfile()"
                            >supprimer</b-button>
                        </div>   
                    </b-modal>

                    <b-modal 
                        id="modal-user-remove-3" 
                        title="A bientôt !" 
                        ok-title="OK" 
                        ok-only
                        @ok="logOut()"
                        centered
                    >
                        
                        <p>Nous vous remercions d'avoir utilisé le réseau social de Groupomania, à bientôt !</p>    
                    </b-modal>

                </div>

               
                <!-- Publications de l'user -->
                <h2 class="my-4 mx-2 font-weight-bold text-left">Publications partagées</h2>
                <PostList :userId="this.userData.id" />

            </b-container>
        </main>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import ProfileImage from '../components/ProfileImage.vue';
import BaseButton from '../components/BaseButton.vue';
import MyProfileEdit from '../components/MyProfileEdit.vue';
import UserProfileInfos from '../components/UserProfileInfos.vue';

import PostList from '../components/PostList.vue';

import { apiFetch } from '../utils/ApiFetch';
import router from '../router/index';

import inputAnimationMixin from '../mixins/inputAnimationMixin.js'
import inputsValidationMixin from '../mixins/inputsValidationMixin.js'
import functionsMixin from '../mixins/functionsMixin.js'
import { validationMixin } from "vuelidate";

import { eventBus } from "../main.js";

export default {
    name: 'MyProfile',
    components: {
        TheHeader,
        ProfileImage,
        BaseButton,
        MyProfileEdit,
        PostList,
        UserProfileInfos
    }, 
    mixins: [inputAnimationMixin, inputsValidationMixin, validationMixin, functionsMixin],
    data() {
        return {
            user: null,
            userData: JSON.parse(localStorage.getItem("userData")),
            accountParams: false,
            passwordChangeForm: {
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: ""
            },
            posts: [],
            showDismissibleAlert: false
        }
    },
    mounted() {
        eventBus.$emit('loadUserProfile');
        eventBus.$emit('loadPosts');
    },
    methods: {
        updateUserInfos(payload) {
            this.user = payload;
        },
        showAccountParams() {
            this.accountParams ? this.accountParams = false : this.accountParams = true;
        },
        async changePassword() {
            this.$v.passwordChangeForm.$touch();
            const currentPasswordInput = document.querySelector("#current-password input");
            const newPasswordInput = document.querySelector("#new-password input");

            const changedPassword = await apiFetch.put(`/auth/user-profile/settings/${this.userData.id}`, { currentPassword: this.passwordChangeForm.currentPassword, newPassword: this.passwordChangeForm.newPassword });
        
           // si mot de passe actuel non reconnu, afficher erreur
            if (changedPassword.error1) {
                currentPasswordInput.classList.add("is-invalid");
            } 
            // sinon s'il n'y a pas d'erreurs dans les autres input,
            else {
                currentPasswordInput.classList.remove("is-invalid");
                currentPasswordInput.classList.add("is-valid");
                if (this.$v.passwordChangeForm.$anyError) {
                    return;
                }
                // afficher message de réussite
                this.showDismissibleAlert = true;
                // redirection à la page connexion
                setTimeout(function() {
                   this.logOut();
                }.bind(this), 5000);
            }
        },
        deleteProfile() {
            apiFetch
                .delete(`/auth/user-profile/${this.user.id}`)
                .then(res => {
                    console.log("delete res:", res)
                })
                .catch(error => {
                    console.log(error)
                }); 
        },
    }
}
</script>

<style lang="scss">
@import "../assets/custom.scss";

.arrow-link:hover {
    background-color: lighten($primary,20%);
    border-radius: 10px;
}

.user-name {
    font-size: 1.3rem;
}
</style>