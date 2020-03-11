<template>
  <div class="goods-list-page">
    <navigation-bar @onLeftClick="onBackClick" pageName="商品列表">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()">
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options @optionsChange="onOptionsChange" :isScroll="true"></goods-options>
      <goods :layoutType="layoutType.type" :sort="sortType"></goods>
    </div>
  </div>
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
  data () {
    return {
      // goods展示形式数据源
      layoutTypeDatas: [
        {
          // 垂直列表
          type: 1,
          icon: require('@imgs/list-type.svg')
        },
        {
          // 网格布局
          type: 2,
          icon: require('@imgs/grid-type.svg')
        },
        {
          // 瀑布流
          type: 3,
          icon: require('@imgs/waterfall-type.svg')
        }
      ],
      // 当前goods展示形式
      layoutType: {},
      // goods排序规则
      sortType: '1-1'
    }
  },
  created () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 切换布局
     */
    onChangeLayoutTypeClick () {
      if (this.layoutType.type === 1) {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === 2) {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    /**
     * 当筛选项改变时被调用
     */
    onOptionsChange (sortType) {
      this.sortType = sortType
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
