<template>
  <div class="buy">
    <navigation-bar :pageName="pageName" @onLeftClick="onBackClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="buy-content">
      <!-- 购买的商品 -->
      <div class="buy-content-goods">
        <!-- 商品图片 -->
        <img class="buy-content-goods-img" :src="goodsData.img" alt="">
        <!-- 商品描述 -->
        <div class="buy-content-goods-desc">
          <p class="buy-content-goods-desc-name">{{ goodsData.name }}</p>
          <p class="buy-content-goods-desc-price">¥{{ goodsData.price | priceValue }}</p>
        </div>
      </div>
      <!-- 支付方式 -->
      <ul class="buy-content-list">
        <li class="buy-content-list-item" v-for="(item, index) in paymentDatas" :key="index" @click="onPayItemClick(item)">
          <img class="buy-content-list-item-icon" :src="item.icon" alt="">
          <!-- 描述 -->
          <div class="buy-content-list-item-desc">
            <p class="buy-content-list-item-desc-name">{{item.name}}</p>
            <p class="buy-content-list-item-desc-desc">{{item.desc}}</p>
          </div>
          <!-- 选中标记 -->
          <img class="buy-content-list-item-check" :src="getCheckIcon(selectPayment.id === item.id)" alt="">
        </li>
      </ul>
      <!-- 立即购买 -->
      <div class="buy-content-pay page-commit">
        立即支付
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
export default {
  name: 'Buy',
  components: {
    NavigationBar
  },
  data () {
    return {
      pageName: '立即购买',
      // 商品数据
      goodsData: {},
      // 支付方式数据源
      paymentDatas: [
        {
          id: 1,
          name: '支付宝支付',
          desc: '数亿用户都在用, 安全可信拖',
          icon: require('@imgs/alipay.svg')
        },
        {
          id: 2,
          name: '微信支付',
          desc: '亿万用户选择, 更快更安全',
          icon: require('@imgs/weichat.png')
        }
      ],
      // 用户选中的支付方式
      selectPayment: {}
    }
  },
  created () {
    this.selectPayment = this.paymentDatas[0]
    this.getGoodsData()
  },
  methods: {
    /**
     * 获取商品详情数据
     */
    getGoodsData () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    /**
     * 返回上一页
     */
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 支付方式切换
     */
    onPayItemClick (item) {
      this.selectPayment = item
    },
    /**
     * 返回支付方式标记的图片
     */
    getCheckIcon (isCheck) {
      return isCheck ? require('@imgs/check.svg') : require('@imgs/no-check.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  &-content {
    overflow: hidden;
    height: 100%;
    // 商品
    &-goods {
      display: flex;
      margin-top: $marginSize;
      padding: $marginSize;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      background-color: #fff;
      &-img {
        width: px2rem(100);
        height: px2rem(100);
      }
      &-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $marginSize;
        width: 100%;
        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);
        }
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }
    // 支付方式
    &-list {
      margin-top: $marginSize;
      &-item {
        display: flex;
        padding: $marginSize;
        border-bottom: px2rem(1) solid $lineColor;
        align-items: center;
        background-color: #fff;
        &-icon {
          width: px2rem(28);
          height: px2rem(28);
        }
        &-desc {
          margin-left: px2rem(12);
          flex-grow: 1;
          &-name {
            font-size: $infoSize
          }
          &-desc {
            margin-top: 6px;
            font-size: $minInfoSize;
            color: $hintColor;
          }
        }
        &-check {
          width: px2rem(16);
          height: px2rem(16);
        }
      }
    }
    // 立即支付
    &-pay {
      position: absolute;
      bottom: px2rem(52);
    }
  }
}
</style>
