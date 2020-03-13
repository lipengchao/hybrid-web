<template>
  <div class="main">
    <keep-alive>
      <!-- 动态组件 -->
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from '@c/common/ToolBar'
export default {
  name: 'Main',
  components: {
    toolBar,
    // eslint-disable-next-line quote-props
    'home': () => import('@c/Home'),
    // eslint-disable-next-line quote-props
    'shopping': () => import('@c/Shopping'),
    // eslint-disable-next-line quote-props
    'my': () => import('@c/My')
  },
  data () {
    return {
      currentComponent: 'home'
    }
  },
  activated () {
    this.pushFragment()
  },
  methods: {
    /**
     * tab切换
     */
    onChangeFragment (componentName) {
      this.currentComponent = componentName
    },
    /**
     * 指定加载的页面组件
     */
    pushFragment () {
      // 获取到组件加载的下标
      const componentIndex = this.$route.params.componentIndex
      // 如果没有下标的话，直接让方法return掉
      if (componentIndex === undefined) return
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
