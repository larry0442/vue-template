import Vue from 'vue';
import Router from 'vue-router';
import { getAuthRoutes } from '@/utils/helper/auth';
import basicRoutes from './routes/basic';
import asyncRoutes from './routes/async';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: basicRoutes,
});
let flag = true;
/* 大坑 条件判断使用addRoutes 不然爆栈 */
router.beforeEach((to, from, next) => {
  if (flag) {
    const accessedRoutes = getAuthRoutes(asyncRoutes, []);
    router.options.routes = router.options.routes.concat(accessedRoutes);
    router.addRoutes(accessedRoutes);
    flag = false;
    next({ ...to, replace: true });
  } else {
    next();
  }
});

// router.options.routes = router.options.routes.concat(asyncRoutes);

export default router;
