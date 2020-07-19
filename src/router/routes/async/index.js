import { BasicLayout, BlankLayout } from '@/components/layouts';
import components from './component';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: true,
    component: BasicLayout,
    meta: {
      title: '工作台',
      icon: 'smile',
    },
    hideChildrenInMenu: true,
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/components/HelloWorld.vue'),
      meta: {
        title: '首页',
      },
    }],
  },
  {
    path: '/customer',
    name: 'customer',
    redirect: '/customer/list',
    component: BasicLayout,
    meta: {
      title: '客户',
      icon: 'smile',
    },
    children: [
      {
        path: '/customer/list',
        name: 'customer-list',
        redirect: '/customer/list/mine',
        component: BlankLayout,
        meta: {
          title: '客户管理',
        },
        children: [
          {
            path: '/customer/list/mine',
            name: 'customer-list-mine',
            component: () => import('@/views/Home'),
            meta: {
              title: '我的客户',
            },
          },
        ],
      },
    ],
  },
  components,
];
export default routes;
