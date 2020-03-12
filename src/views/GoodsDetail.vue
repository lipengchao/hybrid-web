<template>
  <div class="goods-detail">
    <navigation-bar @onLeftClick="onBackClick" :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left">
          <img src="@imgs/back-2.svg" alt="">
        </div>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper
        :height="swiperHeight"
        :swiperImgs="goodsData.swiperImgs"
        :paginationType="2"
      ></my-swiper>
      <!-- 内容 -->
      <div class="goods-detail-content-desc">
        <div class="goods-detail-content-desc-item">
          <!-- 商品价格 -->
          <p class="goods-detail-content-desc-item-price">¥{{ goodsData.price | priceValue }}</p>
          <!-- 商品名称 -->
          <p class="goods-detail-content-desc-item-name">
            <!-- 直营 -->
            <direct v-if="goodsData.isDirect"></direct>
            {{ goodsData.name }}
          </p>
        </div>
        <div class="goods-detail-content-desc-item">
          <!-- 已选商品 -->
          <p class="goods-detail-content-desc-item-select">
            已选<span class="single-row-text">{{ goodsData.name }}</span>
          </p>
          <!-- 附加服务 -->
          <div class="goods-detail-content-desc-item-support">
            <ul class="goods-detail-content-desc-item-support-list">
              <li
                class="goods-detail-content-desc-item-support-list-item"
                v-for="(item, index) in attachDatas"
                :key="index"
              >
                <img src="@imgs/support.svg" alt="">
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        <!-- 商品描述 -->
        <div class="goods-detail-content-desc-detail">
          <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="">
        </div>
        </div>
      </div>
    </div>
    <!-- 加入购物车、立即购买 -->
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add">
        加入购物车
      </div>
      <div class="goods-detail-buy-now">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import MySwiper from '@c/common/MySwiper'
import Direct from '@c/goods/Direct'
import { px2rem } from '@js/utils'
export default {
  components: {
    NavigationBar,
    MySwiper,
    Direct
  },
  data () {
    return {
      navBarStyle: {
        backgroundColor: '',
        position: 'fixed'
      },
      swiperHeight: px2rem(364),
      goodsData: {},
      // 附加服务
      attachDatas: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ]
    }
  },
  created () {
    this.goodsData = this.$route.params.goods
  },
  methods: {
    /**
     * 后退当前页面
     */
    onBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  &-nav-left {
    display: flex;
    width: 100%;
    img {
      align-self: center;
    }
  }
  &-content {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    &-desc {
      width: 100%;
      background: $bgColor;
      box-shadow: 0 0 px2rem(16) 0 rgba($color: #000000, $alpha: .2);
      &-item {
        margin-bottom: $marginSize;
        padding: $marginSize;
        background-color: #fff;
        // 商品价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 商品名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select {
          display: flex;
          height: px2rem(44);
          font-size: $infoSize;
          color: $hintColor;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
          }
        }
        // 附加服务
        &-support {
          margin-top: $marginSize;
          &-list {
            display: flex;
            flex-wrap: wrap;
            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;
              img {
                margin-right: px2rem(4);
                width: px2rem(12);
              }
              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }
      // 描述商品详情
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    border-top: px2rem(1) solid $lineColor;
    background-color: #fff;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }
    &-add {
      background-color: $mainColor;
    }
    &-now {
      background-color: darkgoldenrod;;
    }
  }
}
</style>
