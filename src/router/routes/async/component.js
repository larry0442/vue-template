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
    },
  ],
};

export default routes;
