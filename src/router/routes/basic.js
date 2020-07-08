import Exception from '@/components/HelloWorld.vue';

import ExceptionImage403 from '@/assets/logo.png';
// import ExceptionImage404 from '@/assets/logo.png';
// import ExceptionImage500 from '@/assets/logo.png';

export default [
  {
    path: '/403',
    name: '403',
    component: Exception,
    hiddenInMenu: true,
    props: {
      sourceData: {
        imageUrl: ExceptionImage403,
        type: 403,
        title: '抱歉，你无权访问该页面',
        showHomeButton: true,
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: Exception,
    hiddenInMenu: true,
    props: {
      sourceData: {
        imageUrl: ExceptionImage403,
        type: 404,
        title: '抱歉，你访问的页面找不到了',
        showHomeButton: true,
      },
    },
  },
  {
    path: '/500',
    name: '500',
    component: Exception,
    hiddenInMenu: true,
    props: {
      sourceData: {
        imageUrl: ExceptionImage403,
        type: 500,
        title: '抱歉，服务器出错了',
        showHomeButton: true,
      },
    },
  },
];
