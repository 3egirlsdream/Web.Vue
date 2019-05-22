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
}, {
  name:'Caculator',
  path: '/Caculator',
  meta: {
    title: ''
  },
  component: resolve => require(['./Caculator'], resolve)
}, {
  name: 'Code',
  path: '/Code',
  meta: {
    title: ''
  },
  component: resolve => require(['./Code'], resolve)
}, {
  name: 'ImageRead',
  path: '/ImageRead',
  meta: {
    title: ''
  },
  component: resolve => require(['./ImageRead'], resolve)
}, {
  name: 'Battle',
  path: '/Battle',
  meta: {
    title: ''
  },
  component: resolve => require(['./Battle'], resolve)
}, {
  name: 'Close',
  path: '/Close',
  meta: {
    title: ''
  },
  component: resolve => require(['./Close'], resolve)
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