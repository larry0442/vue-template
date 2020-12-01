import { BasicLayout, BlankLayout } from '@/components/layouts';

const routes = {
  path: '/components',
  name: 'components',
  redirect: true,
  component: BasicLayout,
  meta: {
    title: 'qiniu_sdk',
    icon: 'smile',
    // authorities:[]
  },
  children: [
    {
      path: '/components/qiniu',
      name: 'qiniu',
      redirect: true,
      component: BlankLayout,
      meta: {
        title: '文件管理',
        // authorities:[]

      },
      children: [
        {
          path: '/components/qiniu/summary',
          name: 'components-summary',
          component: () => import('@/views/example/LayoutDetail.vue'),
          meta: {
            title: '文件管理控制台',
          },
        },
      ],
    },
  ],
};

export default routes;
