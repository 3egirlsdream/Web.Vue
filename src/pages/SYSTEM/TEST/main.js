import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import {
  router
} from './router'

import '../../../assets/js/base';
import 'vant/lib/index.less';
import querystring from 'querystring'
Vue.prototype.$qs = querystring;
import {
  DataTable
} from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import fsCfg from '../../../assets/js/fw'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import _ from 'lodash'
Vue.use(Vuetify);
Vue.prototype._ = _
Vue.use(fsCfg);
Vue.use(Vant);
Vue.use(DataTable);

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')