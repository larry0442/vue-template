- layouts 内的 BasicLayout 文件夹内是 layout的主要文件
- BasicLayout.vue 主要布局文件
- BlankLayout.vue 空白布局， 使用位置：空白菜单，例如三级菜单中的上级（二级菜单）必须使用BlankLayout
- PageLayout.vue 带有面包屑组件的页面框架

- layout的组件中获取路由，并动态生成菜单项（见/BasicLayout/BasicMenu.vue）