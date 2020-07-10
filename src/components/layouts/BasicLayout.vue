<template>
  <layout
    :logo="logo"
    :menu="menu"
    :menuOptions="menuOptions"
    :minWidth="992"
    :menuZIndex="990"
    :headerZIndex="1000"
    contentPadding="24px"
  >
    <template #headerLeft>
      <slot name="headerLeft">
        <div class="basic-layout__title">ant-design-vue</div>
      </slot>
    </template>
    <template #headerRight>
      <slot name="headerRight">
        <div class="basic-layout__icon">
           <a-icon type="smile"></a-icon>
        </div>
      </slot>
    </template>
    <template>
      <slot></slot>
    </template>
  </layout>
</template>

<script>
import Layout from '@/components/layouts/BasicLayout/BasicLayout.vue';
// import UserAvatar from '@components/UserAvatar.vue';
// import OverflowTooltip from '@components/OverflowTooltip.vue';
// import NoticeIcon from '@components/NoticeIcon/index';
import logoUrl from '@/assets/logo.png';

export default {
  name: 'BasicLayout',
  components: {
    Layout,
    // UserAvatar,
    // OverflowTooltip,
    // NoticeIcon,
  },
  props: {
    menu: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      logo: logoUrl,
      menuOptions: undefined,
    };
  },
  computed: {
  },
  methods: {
    toHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    handleLogout() {
    },
  },
};
</script>
<style lang="less" scoped>
.basic-layout {
  &__menuicon {
    margin-right: 0;
    margin-bottom: 2px;
    font-size: 24px;
  }

  &__title {
    padding: 0 20px;
    color: rgba(0, 0, 0, .85);
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;
  }

  &__icon {
    display: inline-block;
    padding: 0 12px;
    color: rgba(0, 0, 0, .75);
    font-size: 20px;
    vertical-align: middle;
    cursor: pointer;
  }
}

</style>
