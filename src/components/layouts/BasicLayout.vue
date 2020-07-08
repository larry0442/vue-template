<template>
  <div
    class="basic-layout"
    :style="{minWidth: `${minWidth}px`}"
  >
    <!-- 侧边菜单栏 -->
    <basic-menu
      v-if="menu !== false"
      class="basic-layout__menu"
      :menu="menuData"
      :collapsed.sync="collapsed"
      :mainSelectedKeys="menuOptions && menuOptions.mainSelectedKeys"
      :subOpenKeys="menuOptions && menuOptions.subOpenKeys"
      :subSelectedKeys="menuOptions && menuOptions.subSelectedKeys"
      :style="{
        'z-index': menuZIndex
      }"
    >
      <!-- LOGO -->
      <template #logo>
        <slot name="logo">
          <basic-layout-render
            v-if="checkIsUseRender(logo)"
            :render="logo"
          />
          <img
            v-else-if="logo"
            :src="logo"
          />
        </slot>
      </template>
      <template #icon="{icon}">
        <slot
          name="menuIcon"
          :icon="icon"
        ></slot>
      </template>
    </basic-menu>
    <!-- 头部 -->
    <basic-header
      :class="{
        'basic-layout__header': true,
        'basic-layout__header--full': menu === false
      }"
      :style="{
        'z-index': headerZIndex
      }"
    >
      <!-- 名称 -->
      <slot name="headerLeft">
        <basic-layout-render
          v-if="checkIsUseRender(name)"
          :render="name"
        />
        <div
          v-else
          class="basic-layout__header-name"
        >{{name}}</div>
      </slot>
      <!-- 头部右侧插槽 -->
      <template #right>
        <slot name="headerRight"></slot>
      </template>
    </basic-header>
    <!-- 内容 -->
    <div
      :class="{
        'basic-layout__content': true,
        'basic-layout__content--open': menu !== false && collapsed === false,
        'basic-layout__content--full': menu === false
      }"
    >
      <div
        class="basic-layout__content-wrap"
        :style="{padding: computedContentPadding}"
      >
        <slot>
          <transition
            name="router-fade"
            mode="out-in"
          >
            <router-view />
          </transition>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import BasicHeader from './BasicLayout/BasicHeader.vue';
import BasicMenu from './BasicLayout/BasicMenu.vue';
import BasicLayoutRender from './BasicLayout/render';

export default {
  name: 'BasicLayout',
  components: {
    BasicHeader,
    BasicMenu,
    BasicLayoutRender,
  },
  props: {
    logo: {
      type: [String, Object, Function],
      default: undefined,
    },
    name: {
      type: [String, Object, Function],
      default: undefined,
    },
    menu: {
      type: [Array, Object, Boolean],
      default() {
        return undefined;
      },
    },
    menuOptions: {
      type: Object,
      default() {
        return undefined;
      },
    },
    customMenuFormater: {
      type: Function,
    },
    minWidth: {
      type: Number,
    },
    menuZIndex: {
      type: Number,
    },
    headerZIndex: {
      type: Number,
    },
    contentPadding: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      menuData: [],
      collapsed: this.menuOptions && this.menuOptions.collapsed,
    };
  },
  computed: {
    computedContentPadding() {
      if (Number.isNaN(Number(this.contentPadding))) {
        return this.contentPadding;
      }
      return `${this.contentPadding}px`;
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 检查属性是否使用render渲染
    checkIsUseRender(prop) {
      return ['function', 'object'].includes(typeof prop);
    },
    // 初始化
    init() {
      if (this.menu) {
        if (this.customMenuFormater) {
          this.menuData = this.customMenuFormater(this.menu);
        } else {
          this.menuData = this.menu;
        }
      } else if (this.customMenuFormater) {
        this.menuData = this.customMenuFormater(this.$router.options.routes);
      } else {
        this.menuData = this.formatMenuData(this.$router.options.routes);
      }
    },
    // 格式化菜单数据
    formatMenuData(routers) {
      const menuData = [];
      routers.forEach((item) => {
        if (!item.hiddenInMenu) {
          let children = [];
          if (item.children && !item.hideChildrenInMenu) {
            children = this.formatMenuData(item.children);
          }
          menuData.push({
            path: item.path,
            name: item.name,
            title: (item.meta && item.meta.title) || item.name,
            icon: item.meta && item.meta.icon,
            children,
          });
        }
      });
      return menuData;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./BasicLayout/style/layout.less";
</style>
