## 代码示例
```html
<template>
  <page-layout :breadcrumb="breadcrumb">
    <template v-slot:top>
      内容高度固定
    </template>
    内容高度自动撑开
  </page-layout>
</template>

<script>
import PageLayout from '@components/layouts/PageLayout.vue';

export default {
  components: {
    PageLayout,
  },
  data() {
    return {
      breadcrumb: [
        {
          title: '首页'
        },
        {
          path: '/customer/list',
          title: '客户列表',
        },
        {
          title: '客户详情',
        },
      ],
    };
  },
};
</script>
```

## API
### Attribute
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breadcrumb | 面包屑数据源 | array | [] |

### Slot

| 名称 | 说明 |
| --- | --- |
| default | 高度自动撑开的内容 |
| top | 顶部高度固定的内容 |
