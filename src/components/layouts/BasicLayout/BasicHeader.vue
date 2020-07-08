<template>
  <div class="basic-header">
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicHeader',
};
</script>

<style lang="less" scoped>
  @import './style/header.less';
</style>
