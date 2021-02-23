import Vue from 'vue'
import App from './App.vue'
import {
  router
} from './router'

import '../../../assets/js/base';
import '../../../assets/css/base.css';
import querystring from 'querystring'
Vue.prototype.$qs = querystring;

import '../../../assets/css/style.css'
//import Vuetify from '../../../plugins/vuetify'
//import 'vuetify/dist/vuetify.min.css'

//Vue.use(Vuetify);
import _ from 'lodash'
Vue.prototype._ = _


new Vue({
  router,
  //vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')