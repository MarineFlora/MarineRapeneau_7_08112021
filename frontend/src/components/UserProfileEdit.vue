<template> 
    <b-modal 
        id="modal-profile" 
        title="Modifier le profil" 
        ok-title="modifier"
        cancel-title="annuler"
        centered
    >
        <b-form class="col p-2 overflow-hidden" >
            <b-form-group class="pb-1">
                <h6>Image de profil</h6>
                <ProfileImage imageHeight="60" :imageUrl="user.profilePhoto"/>
            </b-form-group>

            <b-form-group class="pb-1">
                <div class="d-flex">
                    <h6>Prénom</h6>
                    <b-form-input :placeholder="user.firstName"></b-form-input>

                    <h6>Nom</h6>
                    <b-form-input :placeholder="user.lastName"> </b-form-input>
                </div>
            </b-form-group>

            <b-form-group class="pb-1">
                <h6>Profession</h6>
                <b-form-input :placeholder="user.profession"> </b-form-input>
            </b-form-group>

            <b-form-group class="pb-1">
                <h6>Décrivez-vous en quelques mots</h6>
                <b-form-textarea rows="1" :placeholder="user.userDescription"></b-form-textarea>
            </b-form-group>
        </b-form>
    </b-modal>    


</template> 

<script> 
import ProfileImage from '../components/ProfileImage.vue';

export default {
    name: 'UserProfileEdit',
    components: {
        ProfileImage
    },
    props: {
        user: { type: Object, default: 'user' },
    }
}
</script>

<style lang="scss">

</style>