<template>
  <a-tooltip :visible="isShowTooltip">
    <template #title>
      <slot
        v-if="$slots.default"
        name="default"
      ></slot>
      <template v-else>{{sourceData}}</template>
    </template>
    <div
      class="overflow-tooltip__main"
      @mouseenter="onMouseEnter"
      @mouseleave="isShowTooltip = false"
    >
      <div
        ref="content"
        class="overflow-tooltip__content"
      >
        <slot v-if="$slots.default"></slot>
        <template v-else>{{sourceData.substr(0, sourceData.length - suffixLength)}}</template>
      </div>
      <span>
        <slot
          v-if="$slots.suffix"
          name="suffix"
        ></slot>
        <template
          v-else
        >{{ sourceData.substr(suffixLength > 0 ? -suffixLength : sourceData.length) }}</template>
      </span>
    </div>
  </a-tooltip>
</template>

<script>
export default {
  name: 'OverflowTooltip',
  props: {
    sourceData: {
      type: String,
      default: '',
    },
    suffixLength: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isShowTooltip: false,
    };
  },
  methods: {
    onMouseEnter() {
      this.isShowTooltip = this.$refs.content
        && this.$refs.content.scrollWidth > this.$refs.content.offsetWidth;
    },
  },
};
</script>

<style lang="less" scoped>
.overflow-tooltip {
  &__main {
    display: inline-flex;
    max-width: 100%;
    width: 100%;
  }

  &__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
