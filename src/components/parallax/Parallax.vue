<template>
  <!--
    视差效果: 让多层背景以不同的速度去进行移动
    1、至少需要拥有两层背景(缓慢移动区，正常移动区)
    2、将背景设置为相对布局(为缓慢移动去设置top来缓冲掉scrool滚动)
    3、监听Parallax组件的滑动，根据滑动来计算缓慢移动区top的值
   -->
  <div class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="parallax"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 速度差(正常移动区移动100，缓慢移动区移动100 / 2)
const SPEED_DIFF = 2
export default {
  data () {
    return {
      // 页面滑动值
      parallxScroll: 0
    }
  },
  computed: {
    /**
     * 返回slow距离顶部的距离
     */
    slowTop () {
      // 当前页面的滑动距离 / 速度差 = 缓慢移动区应该滑动的距离
      // 当前页面的滑动距离 - 缓慢移动区应该滑动的距离 = 缓慢移动区用来缓冲掉scroll的值
      return (this.parallxScroll - (this.parallxScroll / SPEED_DIFF)) + 'px'
    }
  },
  methods: {
    /**
     * 监听组件滑动
     */
    onScrollChange ($event) {
      this.parallxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallxScroll)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &-slow {
    position: relative;
    width: 100%;
  }
  &-content {
    position: relative;
    width: 100%;
  }
}

</style>
