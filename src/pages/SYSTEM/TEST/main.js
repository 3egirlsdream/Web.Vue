import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import {
  router
} from './router'
import { Toast } from "vant";

import '../../../assets/js/base';
import 'vant/lib/index.less';
import querystring from 'querystring'
Vue.prototype.$qs = querystring;

import fsCfg from '../../../assets/js/fw'
import _ from 'lodash'
// Vue.prototype._ = _
Vue.prototype.$fsCfg = fsCfg;
Vue.prototype.$toast = Toast;
Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')