import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/login/login';
import Index from '@/pages/index/index';
import ActiveAccount from '@/pages/activeAccount/activeAccount';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Index',
      meta: { auth: true },
      component: Index,
    },
    {
      path: '/activeAccount',
      name: 'ActiveAccount',
      component: ActiveAccount,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { meta, path } = to;
  const { auth = false } = meta;
  const isLogin = localStorage.getItem('accessToken');
  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' });
  }
  next();
});

export default router;
