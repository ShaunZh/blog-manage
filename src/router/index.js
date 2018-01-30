import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/login/login';
import Index from '@/pages/index/index';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login,
    // },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
  ],
});
