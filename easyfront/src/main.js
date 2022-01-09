import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import comp from './views/header.vue'
import GerenciaNet from './views/pagamentos/gerenciaNet.vue'


//Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pt-br'
Vue.use(ElementUI, { locale });
//Fim element-ui



//VueMask
import VueMask from 'v-mask'
Vue.use(VueHotkey)
//Fim vueMask


//Vuehotkey
import VueHotkey from 'v-hotkey'
Vue.use(VueMask);
//fim hotkey

Vue.config.productionTip = false

import axios from 'axios'


import moment from 'moment'
Vue.prototype.moment = moment


Vue.config.productionTip = false;
var header = Vue.component('my-component', comp);
var gerenciaNet = Vue.component('gerenciaNet-comp', GerenciaNet);




Vue.prototype.$axios = axios
//axios.defaults.baseURL = 'https://apv1.royalsistema.com.br'
axios.defaults.baseURL = 'http://127.0.0.1:8000'


axios.defaults.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
axios.interceptors.response.use(config => {
	return config;
}, error => {
	// handle the error
	if (error.response.status == 401){
		router.push('/login')
	}
	return Promise.reject(error);
});


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faFilePdf, faTable, faEnvelope, faKey, faSignOutAlt, faCaretSquareLeft, faArrowAltCircleLeft, faFileInvoice, faPager, faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faFilePdf, faTable, faEnvelope, faKey, faSignOutAlt, faCaretSquareLeft, faArrowAltCircleLeft, faFileInvoice, faPager, faBars, faHome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')