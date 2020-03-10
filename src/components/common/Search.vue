<template>
  <div class="search" :style="{backgroundColor: bgColor}">
    <img class="search-icon" :src="icon" alt="">
    <span class="search-hint" :style="{color: hintColor}">mac笔记本大减价处理</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('@imgs/search.svg')
    },
    // 字体颜色
    hintColor: {
      type: String,
      default: '#999999'
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
  background-color: #fff;
  margin: px2rem(6);
  width: 100%;
  border-radius: px2rem(22);
  @include center();
  &-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }
  &-hint {
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $hintColor;
  }
}
</style>
