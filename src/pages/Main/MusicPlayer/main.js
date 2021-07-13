import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import {
  router
} from './router'

import '../../../assets/js/base';
import '../../../assets/css/base.css';
import 'vant/lib/index.less';
import querystring from 'querystring'
Vue.prototype.$qs = querystring;
// src/main.js

//import Vuetify from 'vuetify'
//import 'vuetify/dist/vuetify.min.css'
import _ from 'lodash'
Vue.prototype._ = _
//Vue.use(Vuetify);
Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')