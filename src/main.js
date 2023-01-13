import { createApp } from 'vue';
import App from './App.vue';
// import router from './router';
import { loadFonts } from './plugins/webfontloader';

// PrimeVUE
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import DialogService from 'primevue/dialogservice';
import { createPinia } from 'pinia';
import '@/themes/default.css';                                // Theme
import 'primevue/resources/primevue.min.css';                 // Core css
import 'primeicons/primeicons.css';                           // Icons
import 'primeflex/primeflex.css';                             // Primeflex
import VueRecaptcha from 'vue3-recaptcha-v2';                 // Google recapcha

loadFonts();
const pinia = createPinia();

createApp(App)
.directive('ripple', Ripple)
.directive('styleclass', StyleClass)
/* .use(router) */
.use(pinia)
.use(PrimeVue, { ripple: true })
.use(DialogService)
.use(VueRecaptcha, {
    siteKey: '6LeIpJgjAAAAADaepWA9rlJKKKpsWnXjD4tCr3Do',
    alterDomain: false, // default: false
})

.mount('#app');
