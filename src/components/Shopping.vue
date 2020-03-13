<template>
  <!--
    业务逻辑：
      1、在商品详情中点击加入购物车，系统会通过弹出框提示“添加成功”，
      2、购物车中，购物车会展示我们添加的商品，此时默认状态下，商品处于未选中状态，商品数量为0
      3、可以在购物车中通过+/-来增加或减少该商品购买数量，当商品数量为1时，不可减少
      4、加入购物车时，如果该商品已经存在与购物车中，那么购物车中的该商品数量自动+1
      5、购物车中会展示已选的商品总价格和已选商品的总数量，当选中商品或者选中商品的数量发生变化的时候，展示的总数量也发生变化
   -->
   <!--
     从商品详情中进入购物车页面
      1、首先进入到main.vue
      2、通过main.vue 调转到购物车（可以通过自定义标记）
    -->
  <div class="shopping">
    <navigation-bar pageName="购物车" :isShowBack="false"></navigation-bar>
    <div class="shopping-content">
      <div class="shopping-content-list">
        <!-- 遍历展示商品 -->
        <ul>
          <li class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
            <!-- check -->
            <img class="shopping-content-list-item-check" src="@imgs/no-check.svg" alt="">
            <!-- 商品图片 -->
            <img class="shopping-content-list-item-img" :src="item.img" alt="">
            <!-- 描述 -->
            <div class="shopping-content-list-item-desc">
              <!-- 名称 -->
              <p class="shopping-content-list-item-desc-name text-line-2">
                <!-- 是否为直营 -->
                <direct v-if="item.isDirect"></direct>
                {{ item.name }}
              </p>
              <div class="shopping-content-list-item-desc-data">
                <p class="shopping-content-list-item-desc-data-price">¥{{ item.price | priceValue }}</p>
                <!-- 商品数量的控制组件 -->
                <number-manager :defaultNumber="1" @onChangeNumber="onChangeNumber(arguments, item, index)"></number-manager>
              </div>
            </div>
          </li>
        </ul>
      </div>
       <!-- 统计 -->
      <div class="shopping-content-total">
        <!-- 全选check -->
        <div class="shopping-content-total-check">
          <img src="@imgs/no-check.svg" alt="">
          <p>全选</p>
        </div>
        <!-- 总价格 -->
        <div class="shopping-content-total-price">
          <p class="shopping-content-total-price-total">合计: <span>¥{{ totalData.totalPrice | priceValue }}</span></p>
          <p class="shopping-content-total-price-all">
            总额: <span>¥{{ totalData.totalPrice | priceValue }}</span>&nbsp;&nbsp;
            立减: <span>¥0.00</span>
          </p>
        </div>
        <!-- 结算 -->
        <div class="shopping-content-total-commit">
          去结算({{totalData.goodsNumber}})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import Direct from '@c/goods/Direct'
import NumberManager from '@c/goods/NumberManager'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data () {
    return {
      // 总计
      totalData: {
        // 是否全选
        isAll: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        goodsNumber: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'shoppingDatas'
    ])
  },
  methods: {
    onChangeNumber () {}
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.shopping {
  display: flex;
  overflow: hidden;
  flex-flow: column;
  width: 100%;
  height: 100%;
  &-content {
    display: flex;
    height: 100%;
    flex-direction: column;
    border-top: px2rem(1) solid $lineColor;
    box-sizing: border-box;
    background-color: $bgColor;
    // 商品列表
    &-list {
      overflow: hidden;
      overflow-y: auto;
      height: 100%;
      &-item {
        display: flex;
        padding: $marginSize;
        border-bottom: px2rem(1) solid $lineColor;
        background-color: white;
        &-check {
          width: $checkSize;
          align-self: center;
          padding: px2rem(6)
        }
        &-img {
          width: $listGoodsImgSize;
          height: $listGoodsImgSize;
        }
        &-desc {
          display: flex;
          padding: 0 $marginSize;
          width: 100%;
          flex-direction: column;
          justify-content: space-between;
          &-name {
            font-size: $infoSize;
            line-height: px2rem(18);
          }
          &-data {
            display: flex;
            margin-top: $marginSize;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            &-price {
              font-size: $titleSize;
              color: $mainColor;
              font-weight: 500;
            }
          }
        }
      }
    }
    // 统计
    &-total {
      position: absolute;
      display: flex;
      width: 100%;
      bottom: px2rem(42);
      align-items: center;
      height: px2rem(56);
      box-sizing: border-box;
      border-top: px2rem(1) solid $lineColor;
      background-color: #fff;
      &-check {
        display: flex;
        align-items: center;
        margin: 0 $marginSize;
        img {
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6)
        }
        p {
          font-size: $infoSize;
        }
      }
      &-price {
        display: flex;
        flex-grow: 2;
        flex-direction: column;
        &-total {
          margin-bottom: px2rem(6);
          font-size: $titleSize;
          span {
            font-weight: bold;
          }
        }
        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }
      &-commit {
        display: flex;
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: white;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
