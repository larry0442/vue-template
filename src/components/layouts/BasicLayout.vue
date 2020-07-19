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
      <div class="user-wrapper">
        <a-dropdown>
          <span class="action">
            <user-avatar
              :size="24"
              :src="currentUser.avatar"
              :alt="currentUser.chineseName || currentUser.username"
              :name="currentUser.chineseName || currentUser.username"
            />
          </span>
          <a-menu
            slot="overlay"
            class="user-dropdown-menu-wrapper"
          >
            <a-menu-item class="user-info">
              {{ currentUser.chineseName || currentUser.username }}
              <div
                class="user-info__description"
                v-if="currentUser.position"
              >
                <overflow-tooltip :sourceData="currentUser.position"></overflow-tooltip>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <router-link :to="{
                  name: 'index',
                }">个人中心</router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a
                href="javascript:;"
                @click="handleLogout"
              >
                <a-icon type="logout" />&nbsp;
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </template>
    <template>
      <slot></slot>
    </template>
  </layout>
</template>

<script>
import Layout from '@/components/layouts/BasicLayout/BasicLayout.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import OverflowTooltip from '@/components/OverflowTooltip.vue';
// import NoticeIcon from '@components/NoticeIcon/index';
import logoUrl from '@/assets/logo.png';

export default {
  name: 'BasicLayout',
  components: {
    Layout,
    UserAvatar,
    OverflowTooltip,
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
    currentUser() {
      return {
        avatar: '',
        chineseName: '蚂蚁',
        userName: 'ant',
        position: '前端开发前端开发前端开发',
      };
    },
  },
  methods: {
    toHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    handleLogout() {
      this.$message.success('这里需要补充退出的逻辑');
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
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;
  }

  &__icon {
    display: inline-block;
    padding: 0 12px;
    color: rgba(0, 0, 0, 0.75);
    font-size: 20px;
    vertical-align: middle;
    cursor: pointer;
  }
}
.user-wrapper {
  display: inline-block;
  padding-right: 16px;
  .action {
    display: inline-block;
    height: 100%;
    padding: 0 8px;
    cursor: pointer;
    transition: all 0.3s;
  }
}
.user-dropdown-menu-wrapper {
  margin-top: 16px;
  .ant-dropdown-menu-item {
    padding: 5px 20px;
  }
  .user-info {
    &:hover {
      background-color: #ffffff;
    }
    &__description {
      width: 100px;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
