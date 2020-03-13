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
            <img class="hopping-content-list-item-img" :src="item.img" alt="">
            <!-- 描述 -->
            <div class="hopping-content-list-item-desc">
              <!-- 名称 -->
              <p class="hopping-content-list-item-desc-name">
                <!-- 是否为直营 -->
                <direct v-if="item.isDirect"></direct>
                {{ item.name }}
              </p>
              <div class="hopping-content-list-item-desc-data">
                <p class="hopping-content-list-item-desc-data-price">¥{{ item.price | priceValue }}</p>
                <!-- 商品数量的控制组件 -->
              </div>
            </div>
          </li>
        </ul>
        <!-- 统计 -->
        <div class="shopping-content-total">
          <!-- 全选check -->
          <div class="shopping-content-total-check">
            <img src="@imgs/no-check.svg" alt="">
            <p>全选</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import Direct from '@c/goods/Direct'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavigationBar,
    Direct
  },
  computed: {
    ...mapGetters([
      'shoppingDatas'
    ])
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
