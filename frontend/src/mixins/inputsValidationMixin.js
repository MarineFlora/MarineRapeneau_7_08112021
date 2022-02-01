//--------- Validation des champs de formulaire ---------// 

import { validationMixin } from "vuelidate";
import { required, sameAs, helpers, not } from "vuelidate/lib/validators";

// regex patterns pour validation champs
const passwordValid = helpers.regex('passwordValid', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailValid = helpers.regex('emailValid', /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
const nameValid = helpers.regex('nameValid', /^[a-z\u00C0-\u00FF ,'-]+$/i);

export default {
    mixins: [validationMixin],
    validations: {
        signupForm: {
            firstName: {
                required,
                nameValid
            },
            lastName: {
                required,
                nameValid
            },
            email: {
                required,
                emailValid
            },
            password: {
                required,
                passwordValid
            },
        },

        passwordChangeForm: { 
            currentPassword: {
                required
            },
            newPassword: {
                required,
                passwordValid,
                notSameAsCurrent: not(sameAs('currentPassword')),
                
            },
            newPasswordConfirm: {
                required,
                sameAsPassword: sameAs('newPassword'),
                notSameAsCurrent: not(sameAs('currentPassword')),
                passwordValid,
            }
        }
    },
        
    methods: {
        validateStatePasswordChange(name) {
            const { $dirty, $error } = this.$v.passwordChangeForm[name];
            return $dirty ? !$error : null; 
        },
        validateStateSignUp(name) {
            const { $dirty, $error } = this.$v.signupForm[name];
            return $dirty ? !$error : null; 
        }
        
    }   
  };