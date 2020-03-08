<template>
  <div class="home">
    <my-swiper></my-swiper>
  </div>
</template>

<script>
import MySwiper from '@c/common/MySwiper'
export default {
  components: {
    MySwiper
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
