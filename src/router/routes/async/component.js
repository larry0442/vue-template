import { BasicLayout, BlankLayout } from '@/components/layouts';

const routes = {
  path: '/components',
  name: 'components',
  redirect: true,
  component: BasicLayout,
  meta: {
    title: '组件介绍',
    icon: 'smile',
    // authorities:[]
  },
  children: [
    {
      path: '/components/layouts',
      name: 'layouts',
      redirect: true,
      component: BlankLayout,
      meta: {
        title: 'layouts布局',
        // authorities:[]

      },
      children: [
        {
          path: '/components/layouts/summary',
          name: 'components-summary',
          component: () => import('@/views/example/LayoutDetail.vue'),
          meta: {
            title: 'layouts总览',
          },
        },
      ],
    }, {
      path: '/components/table',
      name: 'components-table',
      component: () => import('@/views/example/Table.vue'),
      meta: {
        title: 'table封装',
      },
    }, {
      path: '/components/user-avatar',
      name: 'components-user-avatar',
      component: () => import('@/views/example/UserAvatar.vue'),
      meta: {
        title: '用户头像组件',
      },
    },
  ],
};

export default routes;
