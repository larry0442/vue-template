<template>
  <div class="basic-menu">
    <div class="basic-menu__logo">
      <slot name="logo"></slot>
    </div>
    <!-- 左侧主菜单 -->
    <div class="basic-menu__main">
      <a-menu
        class="basic-menu__main-content"
        theme="dark"
        :selectedKeys="mainSelectedKeys || mainSelectedKeysData"
      >
        <!-- 一级菜单 -->
        <menu-item
          v-for="item in menu"
          class="basic-menu__item basic-menu__main-item"
          :key="item.path"
        >
          <router-link :to="item.path">
            <basic-layout-render
              v-if="typeof item.icon === 'function'"
              :render="item.icon"
            />
            <slot
              v-else-if="item.icon"
              name="icon"
              :icon="item.icon"
            >
              <icon :type="item.icon" />
            </slot>
            <span class="basic-menu__main-title">{{item.title}}</span>
          </router-link>
        </menu-item>
      </a-menu>
    </div>
    <!-- 右侧子菜单 -->
    <div
      :class="{
        'basic-menu__sub': true,
        'basic-menu__sub--open':
          collapsed === undefined ? subMenuList && subMenuList.length : !collapsed
      }"
    >
      <a-menu
        class="basic-menu__sub-content"
        mode="inline"
        :openKeys="subOpenKeys || subOpenKeysData"
        :selectedKeys="subSelectedKeys || subSelectedKeysData"
        @openChange="(openKeys) => subOpenKeysData = openKeys.slice(-1)"
      >
        <!-- 二级菜单 -->
        <template v-for="item in subMenuList">
          <sub-menu
            v-if="item.children && item.children.length"
            :key="item.path"
            :title="item.title"
          >
            <!-- 三级菜单 -->
            <template v-for="subItem in item.children">
              <menu-item
                v-if="!subItem.hidden"
                :key="subItem.path"
                class="basic-menu__item basic-menu__sub-item"
              >
                <router-link :to="subItem.path">{{subItem.title}}</router-link>
              </menu-item>
            </template>
          </sub-menu>
          <menu-item
            v-else-if="!item.hidden"
            :key="item.path"
            class="basic-menu__item basic-menu__sub-title"
          >
            <router-link :to="item.path">{{item.title}}</router-link>
          </menu-item>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import 'ant-design-vue/es/menu/style';
import 'ant-design-vue/es/icon/style';
import Menu from 'ant-design-vue/es/menu';
import Icon from 'ant-design-vue/es/icon';
import BasicLayoutRender from './render';
import getRouteMatched from './utils/getRouteMatched';

export default {
  name: 'BasicMenu',
  components: {
    AMenu: Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
    Icon,
    BasicLayoutRender,
  },
  props: {
    menu: {
      type: [Array, Object],
      required: true,
    },
    collapsed: {
      type: Boolean,
      default: undefined,
    },
    mainSelectedKeys: {
      type: Array,
      default() {
        return undefined;
      },
    },
    subOpenKeys: {
      type: Array,
      default() {
        return undefined;
      },
    },
    subSelectedKeys: {
      type: Array,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
      // 是否可以更新子菜单展开状态
      canUpdateSubmenuState: true,
      // 子菜单列表
      subMenuList: [],
      // 选中的一级菜单菜单项
      mainSelectedKeysData: [],
      // 展开的子菜单菜单项
      subOpenKeysData: [],
      // 选中的子菜单菜单项
      subSelectedKeysData: [],
    };
  },
  watch: {
    $route() {
      this.updateMenu();
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.canUpdateSubmenuState = this.collapsed === undefined;
      this.updateMenu();
    },
    // 更新菜单
    updateMenu() {
      this.setMenuKeys();
      this.setSubMenu();
      if (this.canUpdateSubmenuState) {
        this.updateSubmenuState();
      }
    },
    // 设置菜单展开和选中状态
    setMenuKeys() {
      let routes = getRouteMatched(this.menu, this.$route.path);
      if (routes && routes.length) {
        const menuDeep = 3;
        routes = routes.slice(0, menuDeep);
        if (routes.length > 1) {
          this.subSelectedKeysData = [routes.slice(-1)[0].path];
        }
        if (routes.length > 2) {
          const routePath = routes.slice(-2)[0].path;
          this.subOpenKeysData = [routePath];
          this.subSelectedKeysData.push(routePath);
        }
        this.mainSelectedKeysData = routes[0].path ? [routes[0].path] : ['/'];
      }
    },
    // 设置子菜单
    setSubMenu() {
      this.menu.some((item) => {
        if (
          item.path
          === (this.mainSelectedKeys
            ? this.mainSelectedKeys[0]
            : this.mainSelectedKeysData[0])
        ) {
          this.subMenuList = item.children;
          return true;
        }
        return false;
      });
    },
    // 更新子菜单展开状态
    updateSubmenuState() {
      if (this.subMenuList && this.subMenuList.length) {
        // 子菜单展开
        this.$emit('update:collapsed', false);
      } else {
        // 子菜单关闭
        this.subSelectedKeysData = [];
        this.subOpenKeysData = [];
        this.$emit('update:collapsed', true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./style/menu.less";
</style>
