import { helpers } from '@vuelidate/validators';
import { email } from '@vuelidate/validators';

/**
 * Validate if value is an email.
 * @type {NormalizedValidator}
 */

export const username = {
    $validator: function(value)  {
        if(helpers.req(value)) {
            return /^[a-zA-Z0-9]+$/.test(value);
        } else {
            return true;
        }
    },
    $message: 'Username must be only letters and numbers',
};

/**
 * Validate if value is an email.
 * @type {NormalizedValidator}
 */

export const usernameoremail = {
    $validator: function(value) {
        if(email.$validator(value)) {
            return true;
        } else if(username.$validator(value)) {
            return true;
        } else {
            return false;
        }
    },
    $message: function(_ref) {
        let value = _ref.$model;
        if(value.includes('@')) {
            return 'Introduzca un email válido';
        } else {
            return 'El usuario sólo debe tener letras y números';
        }
    }
};