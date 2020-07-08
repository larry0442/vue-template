import BasicLayout from '@/components/layouts/index';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: true,
    component: BasicLayout,
    meta: {
      title: '工作台',
      icon: 'icon-dashboard',
    },
    hideChildrenInMenu: true,
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/components/HelloWorld.vue'),
      meta: {
        title: '首页',
      },
    }, {
      path: '/home/:type/detail-table',
      name: 'detail-table',
      component: () => import('@/components/HelloWorld.vue'),
      meta: {
        title: '工作台',
      },
    }],
  },
  {
    path: '/program',
    name: 'program',
    redirect: '/program/list',
    component: BasicLayout,
    meta: {
      title: '项目',
    },
    hideChildrenInMenu: true,
    children: [{
      path: '/program/list',
      name: 'program-list',
      component: () => import('@/components/HelloWorld.vue'),
      meta: {
        title: '项目管理',
      },
    }],
  },
];
export default routes;
