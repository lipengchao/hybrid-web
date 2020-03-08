<template>
  <div class="main">
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
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
  methods: {
    // tab切换
    onChangeFragment (componentName) {
      this.currentComponent = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
