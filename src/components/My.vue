<template>
  <div class="My">
    <navigation-bar pageName="个人中心" :isShowBack="false"></navigation-bar>
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
.My {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
