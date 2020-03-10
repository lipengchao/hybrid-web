<template>
  <div class="seconds">
    <div class="seconds-wrap">
      <p class="seconds-wrap-title">京东秒杀</p>
      <!-- 倒计时模块组件 -->
      <count-down :endHours="18"></count-down>
    </div>
    <ul class="seconds-content">
      <li class="seconds-content-item" v-for="item in dataSource" :key="item.id">
        <img class="seconds-content-item-icon" :src="item.icon" alt="">
        <p class="seconds-content-item-price">¥{{item.price | priceValue}}</p>
        <p class="seconds-content-item-old-price">¥{{item.oldPrice | priceValue}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import CountDown from '@c/seconds/CountDown.vue'
export default {
  props: {
    dataSource: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  components: {
    CountDown
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.seconds {
  margin: $marginSize;
  border-radius: $radiusSize;
  background-color: #fff;
  &-wrap {
    display: flex;
    padding: $marginSize;
    &-title {
      font-size: $titleSize;
      display: inline-block;
    }
  }
  &-content {
    padding: $marginSize 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    &-item {
      padding: 0 px2rem(12);
      text-align: center;
      &-icon {
        width: px2rem(66);
        height: px2rem(66);
      }
      &-price {
        margin-top: $marginSize;
        color: $mainColor;
        font-size: $titleSize;
      }
      &-old-price {
        margin-top: $marginSize;
        color: $hintColor;
        font-size: $infoSize;
        text-decoration: line-through;
      }
    }
  }
}
</style>
