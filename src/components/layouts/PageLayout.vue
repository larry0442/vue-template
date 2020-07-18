<template>
  <div class="page-layout">
    <div
      v-if="breadcrumb && breadcrumb.length"
      class="page-layout__header"
    >
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
        >
          <router-link
            v-if="item.path"
            :to="item.path"
          >{{item.title}}</router-link>
          <template v-else>{{item.title}}</template>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <slot name="operation"></slot>
    </div>
    <div class="page-layout__top">
      <slot name="top"></slot>
    </div>
    <div class="page-layout__main">
      <div class="page-layout__main-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    breadcrumb: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.page-layout {
  .flex-center-vertical(column);
  width: 100%;
  height: 100%;

  &__header,
  &__top,
  &__main {
    width: 100%;
  }

  &__header {
    .flex-center-vertical;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__main {
    flex: 1;
    position: relative;
    box-sizing: border-box;

    &-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
