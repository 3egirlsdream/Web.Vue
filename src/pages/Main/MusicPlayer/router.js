import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
  name: 'Index',
  path: '/',
  meta: {
    title: ''
  },
  component: resolve => require(['./Index'], resolve)
},{
  name: 'About',
  path: '/About',
  meta: {
    title: ''
  },
  component: resolve => require(['./About'], resolve)
},{
  name: 'MyMusic',
  path: '/MyMusic',
  meta: {
    title: ''
  },
  component: resolve => require(['./MyMusic'], resolve)
}];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};