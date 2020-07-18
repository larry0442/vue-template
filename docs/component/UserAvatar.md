## 代码示例
```html
<template>
  <user-avatar
    :size="24"
    :src="data.avatar"
    :alt="data.createUser"
    :name="data.createUser"
    :tooltip="data.createUser"
  />
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue';

export default {
  components: {
    UserAvatar,
  },
};
</script>
```

## API

### Example Props
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| Avatar.props | Ant Design Avatar组件属性 | - | - |
| name | 头像图片不存在时显示的文本，会进行文本截取 | String | - |
| tooltip | 头像hover时显示的tooltip的内容 | String | - |
