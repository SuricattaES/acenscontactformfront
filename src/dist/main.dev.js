"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _webfontloader = require("./plugins/webfontloader");

var _config = _interopRequireDefault(require("primevue/config"));

var _ripple = _interopRequireDefault(require("primevue/ripple"));

var _styleclass = _interopRequireDefault(require("primevue/styleclass"));

var _dialogservice = _interopRequireDefault(require("primevue/dialogservice"));

var _pinia = require("pinia");

require("@/themes/default.css");

require("primevue/resources/primevue.min.css");

require("primeicons/primeicons.css");

require("primeflex/primeflex.css");

var _vue3RecaptchaV = _interopRequireDefault(require("vue3-recaptcha-v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import router from './router';
// PrimeVUE
// Theme
// Core css
// Icons
// Primeflex
// Google recapcha
(0, _webfontloader.loadFonts)();
var pinia = (0, _pinia.createPinia)();
(0, _vue.createApp)(_App["default"]).directive('ripple', _ripple["default"]).directive('styleclass', _styleclass["default"])
/* .use(router) */
.use(pinia).use(_config["default"], {
  ripple: true
}).use(_dialogservice["default"]).use(_vue3RecaptchaV["default"], {
  siteKey: '6LeIpJgjAAAAADaepWA9rlJKKKpsWnXjD4tCr3Do',
  alterDomain: false // default: false

}).mount('#app');