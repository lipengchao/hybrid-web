<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'fade-in'
      } else {
        this.transitionName = 'fade-out'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
