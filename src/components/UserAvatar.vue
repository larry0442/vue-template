<template>
  <a-tooltip
    v-if="tooltip"
    :title="tooltip"
  >
    <a-avatar
      class="user-avatar user-avatar--tooltip"
      v-bind="$props"
    >{{avatarName}}</a-avatar>
  </a-tooltip>
  <a-avatar
    class="user-avatar"
    v-else
    v-bind="$props"
  >{{avatarName}}</a-avatar>
</template>

<script>
import Avatar from 'ant-design-vue/es/avatar/Avatar';

export default {
  name: 'UserAvatar',
  props: {
    ...Avatar.props,
    name: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  computed: {
    avatarName() {
      if (!this.name) {
        return '';
      }
      const length = this.getStringLength(this.name);
      let temName = '';
      let temLength = 0;
      const arr = this.name.split('');
      switch (length) {
        // 英文字符串
        case this.name.length:
          return this.name.slice(0, 3);
        // 中文字符串
        case this.name.length * 2:
          return this.name.substr(-2);
        // 中英混合字符串
        default:
          arr.forEach((item) => {
            temLength += this.getStringLength(item);
            if (temLength <= 4) {
              temName += item;
            }
          });
          return temName;
      }
    },
  },
  methods: {
    getStringLength(str) {
      let length = 0;
      let char = -1;
      const arr = str.split('');
      arr.forEach((item) => {
        char = item;
        if (char.charCodeAt() >= 0 && char.charCodeAt() <= 128) {
          length += 1;
        } else {
          length += 2;
        }
      });
      return length;
    },
  },
};
</script>

<style lang="less" scoped>
.user-avatar {
  background: #187fff;

  &--tooltip {
    cursor: pointer;
  }
}
</style>
