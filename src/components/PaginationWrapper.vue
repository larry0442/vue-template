<template>
  <div class="pagination-wrapper">
    <a-spin
      class="pagination-wrapper__spin"
      :spinning="isShowSpin"
    >
      <div
        v-if="$slots.header || $slots.headerLeft || $slots.headerRight"
        class="pagination-wrapper__header"
      >
        <slot
          name="header"
          v-bind="slotData"
        >
          <div class="pagination-wrapper__header-wrap">
            <div>
              <slot
                name="headerLeft"
                v-bind="slotData"
              ></slot>
            </div>
            <div>
              <slot
                name="headerRight"
                v-bind="slotData"
              ></slot>
            </div>
          </div>
        </slot>
      </div>
      <div class="pagination-wrapper__main">
        <slot v-bind="slotData"></slot>
      </div>
      <div class="pagination-wrapper__footer">
        <div>
          <slot
            name="footerLeft"
            v-bind="slotData"
          ></slot>
        </div>
        <a-pagination
          size="small"
          :current="index"
          :pageSize="size"
          :total="slotData.total"
          showSizeChanger
          showQuickJumper
          :showTotal="total => `共 ${total} 条`"
          @change="onChange"
          @showSizeChange="onChange"
        />
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'PaginationWrapper',
  props: {
    pageIndex: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    // 请求
    dataRender: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isShowSpin: true,
      index: 1,
      size: 10,
      slotData: {},
    };
  },
  methods: {
    // 初始化
    init() {
      this.initPage();
      this.getListData();
    },
    initPage() {
      this.index = this.pageIndex;
      this.size = this.pageSize;
    },
    // 刷新列表，调用方法为`this.$refs.paginationWrapper.refresh();`
    refresh(boolean) {
      this.$nextTick(() => {
        if (boolean) {
          this.initPage();
        }
        this.getListData();
      });
    },
    // 获取列表数据
    getListData() {
      this.isShowSpin = true;
      this.dataRender({
        page: this.index,
        pageSize: this.size,
      })
        .then((res) => {
          this.slotData = {

            current: res.pageNum,
            total: res.total,
            list: res.list,
          };
          this.isShowSpin = false;
        })
        .catch(() => {
          this.isShowSpin = false;
        });
    },
    // 分页change事件
    onChange(page, pageSize) {
      this.index = page;
      this.size = pageSize;
      this.getListData();
      this.$emit('change', page, pageSize);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.pagination-wrapper {
  height: 100%;

  &__spin {
    height: 100%;

    /deep/ .ant-spin-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  &__header {
    padding: 16px 20px;

    &-wrap {
      .flex-center-vertical;
      justify-content: space-between;
    }
  }

  &__main {
    flex: 1;
    overflow: auto;
  }

  &__footer {
    .flex-center-vertical;
    justify-content: space-between;
    height: 64px;
    padding: 0 20px;
  }
}
</style>
