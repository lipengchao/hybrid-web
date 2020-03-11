<template>
  <transition name="fade-in">
    <div class="goods-list-page">
      <navigation-bar @onLeftClick="onBackClick" pageName="商品列表"></navigation-bar>
      <div class="goods-list-page-content">
        <goods-options></goods-options>
        <goods></goods>
      </div>
    </div>
  </transition>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import GoodsOptions from '@c/goods/GoodsOptions'
import Goods from '@c/goods/Goods'
export default {
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: $bgColor;
  &-content {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
}
</style>
