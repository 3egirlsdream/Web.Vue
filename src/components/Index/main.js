import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import {
  router
} from './router'

//import '../assets/js/base';
import 'vant/lib/index.less';

import {
  DataTable
} from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(Vant);
Vue.use(DataTable);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')