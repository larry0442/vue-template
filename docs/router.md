## 路由命名规范
- 使用KebabCase命名（例如：person-id）

## 数据结构
```javascript
interface Meta {
  title: string;
  icon: string;
  keepAlive: boolean;
  authorities: string[];
  [key: string]: any;
}

interface RouterItem {
  path: string;
  name: string;
  redirect: string;
  component: Vue.VNode;
  hideChildrenInMenu: boolean;
  hideInMenu: boolean;
  meta: Meta;
  children: RouterItem[];
  [key: string]: any;
}
```
1. 特别说明： redirect: true 表示重定向至第一个子路由，跳转操作在src/utils/helper/auth.js中，处理为 父路由重定向至第一个子路由
