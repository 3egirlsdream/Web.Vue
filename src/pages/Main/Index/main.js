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
import {
  DataTable
} from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import _ from 'lodash'
Vue.prototype._ = _

Vue.use(Vant);
Vue.use(DataTable);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')