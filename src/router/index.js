import Vue from 'vue';
import Router from 'vue-router';
import basicRoutes from './routes/basic';
import asyncRoutes from './routes/async';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: basicRoutes,
});

router.addRoutes(asyncRoutes);
export default router;
