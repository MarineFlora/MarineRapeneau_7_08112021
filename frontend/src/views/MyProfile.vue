<template>
    <div class="my-profile">
        <TheHeader />
        <main>
            <b-container class="maxwidth-page">
                <!-- RETOUR DES INFORMATIONS DU PROFIL CONNECTE -->
                <UserProfileInfos userPageTitle="Mon Profil :" :userId="this.userData.id"  @user-infos="updateUserInfos" />

                <!-- EDITION DU PROFILPUBLIQUE -->
                <div class="d-flex flex-column align-items-center">
                    <div>
                        <BaseButton button-title="Editer le profil" v-b-modal.modal-edit-profile class="my-2" />
                    </div>
                    <MyProfileEdit :user="user" />
                </div>  

                <!-- EDITION PARAMETRES CONFIDENTIELS -->
                <div class="d-flex flex-column align-items-end mt-4 mb-5">
                    <div>
                        <b-icon 
                            icon="shield-lock-fill" 
                            font-scale="1.2" 
                        ></b-icon>
                        <b-link class="text-dark pl-1" @click="showAccountParams">Modifier les paramètres du compte</b-link>
                    </div>

                    <!-- lien changer mot de passe -->
                    <b-link class="text-dark font-italic" v-b-modal.modal-change-password v-show="accountParams">changer votre mot de passe</b-link>

                    <b-modal 
                        id="modal-change-password" 
                        title="Changer de mot de passe" 
                        ok-title="Enregistrer"
                        cancel-title="annuler"
                        centered
                        @ok.prevent="changePassword()"
                    >
                        <!-- formulaire -->
                        <b-form class="px-2">
                            <!-- mot de passe actuel -->
                            <b-form-group>
                                <div class="input-div" id="current-password">
                                    <label for="current-password-input" class="text-left">Mot de passe actuel</label>
                                    <b-form-input  
                                        v-model="$v.passwordChangeForm.currentPassword.$model" 
                                        @focus="addClassFocus('#current-password')"
                                        @blur="removeClassFocus('#current-password')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="current-password"
                                        id="current-password-input"
                                    ></b-form-input> 

                                  <b-form-invalid-feedback class="text-left">Mot de passe saisi incorrect</b-form-invalid-feedback> 
                                </div>    
                            </b-form-group>
                            <!-- nouveau mot de passe -->
                            <b-form-group>
                                <div class="input-div" id="new-password">
                                    <label for="new-password-input" class="text-left">Nouveau mot de passe</label>
                                    <b-form-input  
                                        v-model="$v.passwordChangeForm.newPassword.$model" 
                                        :state="validateStatePasswordChange('newPassword')"
                                        @focus="addClassFocus('#new-password')"
                                        @blur="removeClassFocus('#new-password')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="new-password"
                                        id="new-password-input"
                                    ></b-form-input>

                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPassword.passwordValid" class="text-left">Votre mot de passe doit avoir au moins : <br>
                                    - 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial</b-form-invalid-feedback>  
                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPassword.notSameAsCurrent" class="text-left">Votre mot de passe doit être différent de votre ancien mot de passe</b-form-invalid-feedback>         
                                </div>    
                            </b-form-group>
                            <!-- confirmation nouveau mot de passe -->
                            <b-form-group>
                                <div class="input-div" id="new-password-confirm">
                                    <label for="new-password-input-ok" class="text-left">Confirmer le mot de passe</label>
                                    <b-form-input  
                                        v-model="passwordChangeForm.newPasswordConfirm" 
                                        :state="validateStatePasswordChange('newPasswordConfirm')"
                                        @focus="addClassFocus('#new-password-confirm')"
                                        @blur="removeClassFocus('#new-password-confirm')"
                                        type="password"
                                        class="px-4 input pt-3"
                                        autocomplete="new-password"
                                        id="new-password-input-ok"
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-if="!$v.passwordChangeForm.newPasswordConfirm.sameAsPassword" class="text-left">Les mots de passe ne correspondent pas.</b-form-invalid-feedback>         
                                </div>    
                            </b-form-group>
                        </b-form>  
                         
                        <p class="mb-5">Vous devrez vous reconnecter après la modification de votre mot de passe.</p>

                        <!-- message de réussite avant redirection -->
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
                        <BaseButton button-title="oui, je supprime mon compte" v-b-modal.modal-user-remove-2 />
                    </b-modal>

                    <!-- 2ème confirmation et suppression -->
                    <b-modal 
                        id="modal-user-remove-2" 
                        title="Toujours sûr de vouloir nous quitter ?" 
                        hide-footer
                        centered
                    >
                        <p class="mb-5">Il est encore temps de faire marche arrière... <br>
                        Pour supprimer définitivement votre compte, cliquez sur "supprimer".</p>
                        <BaseButton button-title="supprimer" v-b-modal.modal-user-remove-3  @click.native="deleteProfile()" /> 
                    </b-modal>
                    
                    <!-- message à bientot et redirection -->
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

                <!-- PUBLICATIONS DE L'USER CONNECTE-->
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
            showDismissibleAlert: false
        }
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

            const changedPassword = await apiFetch.put(`/auth/user-profile/settings/${this.userData.id}`, { currentPassword: this.passwordChangeForm.currentPassword, newPassword: this.passwordChangeForm.newPassword, newPasswordConfirm: this.passwordChangeForm.newPasswordConfirm  });
        
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