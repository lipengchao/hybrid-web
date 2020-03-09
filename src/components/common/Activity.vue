<template>
  <div class="activity">
    <!-- 插槽，展示活动内容 -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * 活动组件
 *
 * 描述： 只提供一个空间，用来存放活动的内容，具体内容不用管
 */
export default {
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.activity {
  position: relative;
  max-height: px2rem(160);
  z-index: 2
}
</style>
