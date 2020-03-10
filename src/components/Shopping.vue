<template>
  <div class="shopping">
    <navigation-bar pageName="购物车" :isShowBack="false"></navigation-bar>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
