<template>
  <div class="home">
    <p class="test">测试fontSize</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.test {
  font-size: px2rem(16);
}
</style>
