<template>
    <div class="formgrid grid m-0 p-0">
        <div class="field pl-0 sm:pr-3 xs:pr-0 col-12 sm:col-6">
            <span class="">
                <label for="username" class="labelTitle">
                    Nombre <span class="labelTitleMand">*</span>
                </label>
                <InputText id="username" type="text" v-model="formData.name" 
                           class="w-full mt-1"
                           @blur="formData$v.name.$validate()"
                           :class="{ 'p-invalid': formData$v.name.$errors.length }" />
                <InlineMessage severity="error" v-if="formData$v.name.$errors.length > 0" 
                               class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="null" closable="true">
                    <span v-for="error of formData$v.name.$errors" :key="error.$uid" class="text-sm line-height-1">
                        <strong>{{ error.$message }}. </strong>
                    </span>
                </InlineMessage>
            </span>
        </div>
        <div class="field px-0 sm:pl-2 xs:pl-0 col-12 sm:col-6">
            <span class="">
                <label for="enterprise" class="labelTitle">Empresa</label>
                <InputText id="enterprise" type="text" v-model="formData.enterprise"
                           class="w-full mt-1"
                           @blur="formData$v.enterprise.$validate()"
                           :class="{ 'p-invalid': formData$v.enterprise.$errors.length }" />
                <InlineMessage severity="error" v-if="formData$v.enterprise.$errors.length > 0" 
                               class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                    <span v-for="error of formData$v.enterprise.$errors" :key="error.$uid" class="text-sm line-height-1">
                        <strong>{{ error.$message }}. </strong>
                    </span>
                </InlineMessage>
            </span>
        </div>
        <div class="field px-0 sm:pr-3 xs:pr-0 col-12 sm:col-6">
            <span class="">
                <label for="nif" class="labelTitle">
                    NIF/CIF <span class="labelTitleMand">*</span>
                </label>
                <InputText id="nif" type="text" v-model="formData.nif" 
                           class="w-full mt-1"
                           @blur="formData$v.nif.$validate()"
                           :class="{ 'p-invalid': formData$v.nif.$errors.length }" />
                <InlineMessage severity="error" v-if="formData$v.nif.$errors.length > 0" 
                               class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                    <span v-for="error of formData$v.nif.$errors" :key="error.$uid" class="text-sm line-height-1">
                        <strong>{{ error.$message }}. </strong>
                    </span>
                </InlineMessage>
            </span>
        </div>
        <div class="field sm:pl-2 xs:pl-0 px-0 col-12 sm:col-6">
            <span class="">
                <label for="email" class="labelTitle">
                    Email <span class="labelTitleMand">*</span>
                </label>
                <InputText id="email" type="text" v-model="formData.email"
                           class="w-full mt-1"
                           @blur="formData$v.email.$validate()"
                           :class="{ 'p-invalid': formData$v.email.$errors.length }" />
                <InlineMessage severity="error" v-if="formData$v.email.$errors.length > 0" 
                               class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                    <span v-for="error of formData$v.email.$errors" :key="error.$uid" class="text-sm line-height-1">
                        <strong>{{ error.$message }}. </strong>
                    </span>
                </InlineMessage>
            </span>
        </div>
        <div class="field sm:pr-3 xs:pr-0 px-0 col-12 sm:col-6">
            <span class="">
                <label for="phone" class="labelTitle">
                    Teléfono <span class="labelTitleMand">*</span>
                </label>
                <InputText id="phone" type="text" v-model="formData.phone" 
                           class="w-full mt-1"
                           @blur="formData$v.phone.$validate()"
                           :class="{ 'p-invalid': formData$v.phone.$errors.length }" />
                <InlineMessage severity="error" v-if="formData$v.phone.$errors.length > 0" 
                               class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                    <span v-for="error of formData$v.phone.$errors" :key="error.$uid" class="text-sm line-height-1">
                        <strong>{{ error.$message }}. </strong>
                    </span>
                </InlineMessage>
            </span>
        </div>

        <div class="col-12 mb-4 mt-2 px-0">
            <vue-recaptcha theme="light" size="normal" :tabindex="0"
                           @widgetId="recaptchaWidget = $event" id="capcha"
                           @verify="callbackVerify($event)"
                           @expired="callbackExpired()"
                           @fail="callbackFail()"
                           @blur="formData$v.captchacode.$validate()"
                           :class="{ 'p-invalid': formData$v.captchacode.$errors.length }"/>
            <InlineMessage severity="error" v-if="formData$v.captchacode.$errors.length > 0" 
                           class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                <span v-for="error of formData$v.captchacode.$errors" :key="error.$uid" class="text-sm line-height-1">
                    <strong>{{ error.$message }}. </strong>
                </span>
            </InlineMessage>
        </div>

        <div class="field-checkbox px-0 align-content-start align-items-start col-12">
            <Checkbox inputId="legal" v-model="formData.legals" :binary="true"
                      :class="{ 'p-invalid': formData$v.legals.$errors.length }"
                      name="nlcheck" />
            <label for="legal">
                Estoy de acuerdo con la
                <a href="https://www.acens.com/corporativo/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">
                    política de privacidad
                </a>
                y las
                <a href="https://www.acens.com/corporativo/condiciones-ofertas/" target="_blank" rel="noopener noreferrer">
                    condiciones de la oferta
                </a>
            </label>
            <InlineMessage severity="error" v-if="formData$v.legals.$errors.length > 0" 
                           class="mt-1 p-2 line-height-1 w-full text-left justify-content-start" :icon="false" closable="true">
                <span v-for="error of formData$v.legals.$errors" :key="error.$uid" class="text-sm line-height-1">
                    <strong>{{ error.$message }}. </strong>
                </span>
            </InlineMessage>
        </div>
        <div class="field-checkbox col-12 px-0">
            <Checkbox inputId="newsletter" name="nlcheck" v-model="formData.newsletter"
                      :binary="true" />
            <label for="newsletter">
                Acepto recibir el boletín mensual de
                <a href="https://www.acens.com/actualidad/boletin-mensual/" target="_blank" rel="noopener noreferrer">
                    aceNews
                </a>
            </label>
        </div>
        <Button class="accensbutton px-3 mt-3" label="Enviar formulario"
                @click="sendAction" />

    </div>
</template>

<script>
    import { ref, reactive, nextTick } from 'vue';
    import InputText from 'primevue/inputtext';
    import Checkbox from 'primevue/checkbox';
    import Button from 'primevue/button';
    import InlineMessage from 'primevue/inlinemessage';
    import { VueRecaptcha } from 'vue3-recaptcha-v2';
    import { required, email, minLength, 
    maxLength, helpers as vlhelpers } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';
    import { acensphone, acensnifcifformat, acensnifciffreal, istrue } from '@/helpers/validators/acens';
    import axios from 'axios';

    export default {
        name: 'formComp',
        components: {
            // Prime
            InputText, Checkbox, Button, VueRecaptcha, InlineMessage
        },
        setup() {
            const formDefault = () => ({
                name: '',
                enterprise: '',
                nif: '',
                email: '',
                phone: '',
                legals: false,
                newsletter: false,
                captchacode: '',
                serverError: '',
                reset: function() {
                    Object.assign(formData, formDefault());
                }
            });

            const formData = reactive(formDefault());
            const formRef = ref(null);

            // Validation
            const formData_v = {
                name: {
                    required: vlhelpers.withMessage('El nombre no debe estar vacío', required),
                    maxLength: vlhelpers.withMessage('El nombre no puede exceder los 50 caracteres', maxLength(50)),
                },
                enterprise: {
                    maxLength: vlhelpers.withMessage('La empresa no puede exceder los 50 caracteres', maxLength(50)),
                },
                nif: {
                    required: vlhelpers.withMessage('El NIF/CIF no debe estar vacío', required), 
                    maxLength: vlhelpers.withMessage('El NIF/CIF debe tener 9 caracteres', maxLength(9)),
                    minLength: vlhelpers.withMessage('El NIF/CIF debe tener 9 caracteres', minLength(9)),
                    acensnifcifformat: vlhelpers.withMessage('El NIF/CIF debe estar en formato español', acensnifcifformat),
                    acensnifciffreal: vlhelpers.withMessage('El NIF/CIF debe ser real', acensnifciffreal),
                },
                email: {
                    required: vlhelpers.withMessage('El correo no debe estar vacío', required),
                    maxLength: vlhelpers.withMessage('El email no puede exceder los 50 caracteres', maxLength(50)),
                    email: vlhelpers.withMessage('El email debe ser una dirección válida', email),
                },
                phone: {
                    required: vlhelpers.withMessage('El teléfono no debe estar vacío', required),
                    maxLength: vlhelpers.withMessage('El teléfono debe tener 9 caracteres', maxLength(9)),
                    minLength: vlhelpers.withMessage('El teléfono debe tener 9 caracteres', minLength(9)),
                    acensphone: vlhelpers.withMessage('El teléfono debe comenzar por 6, 7, 8 o 9', acensphone),
                },
                legals: {
                    required: vlhelpers.withMessage('La casilla de aceptación de políticas debe estar presente', required),
                    istrue: vlhelpers.withMessage('Debe aceptar las políticas y condiciones', istrue),
                },
                newsletter: {
                    required: vlhelpers.withMessage('La casilla del newsletter debe estar presente', required),
                }, 
                captchacode: {
                    required: vlhelpers.withMessage('El captcha debe estar presente', required),
                    maxLength: vlhelpers.withMessage('Capcha erróneo', maxLength(1000)),
                    minLength: vlhelpers.withMessage('La casilla de verificación contra robots debe ser marcada', minLength(50)),
                },
            };

            const formData$v = useVuelidate(formData_v, formData, { $rewardEarly: true });

            // Capcha
            const recaptchaWidget = ref(null);

            const callbackVerify = (response) => {
                formData.captchacode = response;
            };

            const callbackExpired = () => {
                formData.captchacode = '';
            };

            const callbackFail = () => {
                formData.captchacode = '';
            };

            // Actions
            const sendAction = async function() {
                let status = await formData$v.value.$validate();
                if(!status) return;
                axios.post('https://nodered.suricatta.es/acens/migrandoalanube', {
                    'name': formData.name,
                    'enterprise': formData.enterprise,
                    'VAT': formData.nif,
                    'email': formData.email,
                    'phone': formData.phone,
                    'date': formData.data,
                    'newsletter': formData.newsletter ? 'yes' : ''
                })
                .then(async () => {
                    await nextTick();
                    window.location.href = 'https://www.migrandoalanubeconawsbyacens.com/gracias/';
                    window.location.replace('https://www.migrandoalanubeconawsbyacens.com/gracias/');
                    window.location.assign('https://www.migrandoalanubeconawsbyacens.com/gracias/');
                })
                .catch((error) => {
                    formData.serverError = error.data.message;
                });
            };

            return {
                formDefault, formData, formRef, recaptchaWidget,
                callbackVerify, callbackExpired, callbackFail, sendAction, formData$v
            };
        }
    };
</script>

<style scoped>
.labelTitle {
    font-weight: bold;
}

.labelTitleMand {
    color: #c02b0a;
    vertical-align: top;
    font-size: small;
}

.accensbutton {
    text-transform: uppercase;
}
</style>

<style>
.p-inline-message-icon {
    margin-top: 1px;
}

.field-checkbox label {
    margin-top: 1.5px !important;
}

a {
    color: #2694b6;
}

a:hover {
    color: #176c85;
}

.p-inline-message-icon {
    display: none;
}
</style>