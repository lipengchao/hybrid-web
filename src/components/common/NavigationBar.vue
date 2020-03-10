<template>
  <div class="nav-bar z-index-max" :class="{'bottom-line': pageName}">
    <div class="left">
      <!-- 默认样式 -->
      <img v-if="isShowBack" src="@imgs/back.svg" alt="">
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <!-- 默认样式 -->
      <span class="page-title" v-if="pageName">{{ pageName }}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 功能：
 *  1. 默认的展示效果 -> 左边后退按钮的图标、中间页面的名称、右边是空白的内容
 *  2. 可通过插槽来配置具体的展示样式 -> 左、中、右三个插槽，父组件可以通过这三个插槽来指定对应的样式
 *  3. 可以接收从外部指定的一个样式(可以在父组件中指定navigationBar的style)
 */
export default {
  props: {
    // 页面标题名称
    pageName: {
      type: String,
      default: ''
    },
    // 是否展示后退按钮
    isShowBack: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.nav-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  .left, .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;
    img {
      width: 100%;
      align-self: center;
    }
  }
  .center {
    display: flex;
    flex-grow: 1;
    height: 100%;
    .page-title {
      align-self: center;
      font-size: $titleSize;
    }
  }
}
.bottom-line {
  border-bottom: 1px solid $lineColor;
}
</style>
