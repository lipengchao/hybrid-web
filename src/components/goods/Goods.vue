<template>
  <!--
    如何在同一个组件中去展示不同的样式
    1. html表示整个布局的结构，具体的展示，将由css决定
    2. 每种展示样式对应不同的css，也就是对应不同的类名
      （1）垂直列表 -> goods-list
      （2）网格布局 -> goods-grid
      （3）瀑布流布局 -> goods-waterfall
    3. 实现不同的展示形式，本质上就是实现不同的css样式
    瀑布流的布局：
    1. 创建结构，让item相对于goods进行排列
    2. 生成不同高度的图片，撑起不同高度的item
    3. 计算item的位置，来达到从上到下，从左到右依次排列的目的
   -->
   <!-- 如果不允许goods单独滑动，那么就不添加goods-scroll类 -->

   <!--
     商品排序：
      1. 排序之后的数据源，用来在html中进行展示(替换掉dataSource)
      2. 定义排序规则（可以直接使用GoodsOptions中数据源的id）
      3. 定义排序的方法，根据排序规则来修改对应的排序
    -->
  <div class="goods" :class="[layoutClass, {'goods-scroll': isScroll}]" :style="{height: goodsViewHeight}">
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item, index) in sortGoodsData"
      :key="item.id"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
    >
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
      <!-- 描述 -->
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint' : !item.isHave}">
          <!-- 是否为直营 -->
          <direct v-if="item.isDirect"></direct>
          <!-- 是否有库存 -->
          <no-have v-if="!item.isHave"></no-have>
          {{ item.name }}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">¥{{ item.price | priceValue }}</p>
          <p class="goods-item-desc-data-volume">销量:{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Direct from '@c/goods/Direct'
import NoHave from '@c/goods/NoHave'

// 最大高度
const MAX_IMG_HEIGHT = 230
// 最小高度
const MIN_IMG_HEIGHT = 178
// item margin
const ITEM_MARGIN_SIZE = 8

export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    // 指定的展示形式
    // 1: 垂直列表
    // 2: 网格布局
    // 3: 瀑布流布局
    layoutType: {
      type: Number,
      default: 1
    },
    // 是否允许goods单独滑动
    // 默认允许
    isScroll: {
      type: Boolean,
      default: true
    },
    // 排序规则
    // 1-1: 默认
    // 1-2: 价格由高到低
    // 1-3: 销量由高到低
    // 2：有货优先
    // 3：直营优先
    sort: {
      type: String,
      default: '1-1'
    }
  },
  data () {
    return {
      // 数据源
      dataSource: [],
      // 排序数据
      sortGoodsData: [],
      // 图片样式集合
      imgStyles: [],
      // item样式集合
      goodsItemStyles: [],
      // goods组件的高度
      goodsViewHeight: '100%',
      // 不同展示形式的类名
      // 垂直列表的展示形式(默认) -> goods-list & goods-list-item
      // 网格布局的展示形式 -> goods-grid & goods.grid-item
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  created () {
    this.initData()
  },
  watch: {
    layoutType () {
      this.initLayout()
    },
    sort () {
      this.setSortGoodsData()
    }
  },
  methods: {
    /**
     * 获取数据
     */
    initData () {
      this.$http.get('/goods')
        .then(data => {
          this.dataSource = data.list
          // 数据排序
          this.setSortGoodsData()
          // 设置布局
          this.initLayout()
        })
    },

    /**
     * 返回随机的图片高度
     */
    imgHeight () {
      // Math.random() -> 0 - 1随机数 * (高度区间) + 最低的图片高度
      const result = Math.floor(Math.random() * (MAX_IMG_HEIGHT - MIN_IMG_HEIGHT) + MIN_IMG_HEIGHT)
      return result
    },

    /**
     * 根据随机的图片高度，生成对应的图片样式数据
     */
    initImgStyles () {
      this.dataSource.forEach(item => {
        // 随机生成的图片高度
        const imgHeight = this.imgHeight() + 'px'
        // j将图片高度push到img样式集合
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },

    /**
     * 瀑布流布局
     * 1. 获取到所有的item元素
     * 2. 遍历item元素，得到每一个item的高度，加上一个margin的高度
     * 3. 创建两个变量: leftHeightTotal rightHeightTotal 分别表示左右两侧目前距离顶部的高度
     * 通过对比左右两侧距离顶部的高度，来确定item的放置位置
     * 如果leftHeightTotal < rightHeightTotal 那么item就应该放置到左侧，此时item距离左侧为0，距离当前的leftHeightTotal
     * 否则，放置到右侧，此时item距离右侧的距离为0，距离顶部为rightHeightTotal
     *
     * 4. 保存计算出的item的所有样式，配置到item上
     * 5. item配置完成之后，对比左右两侧最大的高度，最大的高度为goods组件的高度
     */
    initWaterfall () {
      // 获取到所有item元素
      const $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      // 左右两侧距离顶部的高度
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        // item 样式
        let goodsItemStyle = {}
        // 遍历item元素，得到每一个item的高度，加上一个margin的高度
        const elHeight = $el.clientHeight + ITEM_MARGIN_SIZE
        // 对比 左右两侧距离顶部的高度
        if (leftHeightTotal <= rightHeightTotal) {
          // 把item放在左侧
          goodsItemStyle = {
            left: '0',
            top: leftHeightTotal + 'px'
          }
          // 更新左侧距离顶部的高度
          leftHeightTotal += elHeight
        } else {
          // item 放在右侧
          goodsItemStyle = {
            right: '0',
            top: rightHeightTotal + 'px'
          }
          // 更新右侧距离顶部的高度
          rightHeightTotal += elHeight
        }
        // 保存计算item的所有样式，配置到item上
        this.goodsItemStyles.push(goodsItemStyle)
      })
      // 如果允许单独互动就不计算高度，否则计算高度
      if (!this.isScroll) {
      // 对比左右两侧最大的高度，最大的高度为goods组件的高度
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    },
    /**
     * 商品排序
     */
    setSortGoodsData () {
      switch (this.sort) {
        // 1-1: 默认
        case '1-1':
          // 深拷贝数据源，不改变源数组
          this.sortGoodsData = this.dataSource.slice()
          break
        // 1-2: 价格由高到低
        case '1-2':
          this.getSortDataFromKey('price')
          break
        // 1-3: 销量由高到低
        case '1-3':
          this.getSortDataFromKey('volume')
          break
        // 2：有货优先
        case '2':
          this.getSortDataFromKey('isHave')
          break
        // 3：直营优先
        case '3':
          this.getSortDataFromKey('isDirect')
          break
        default:
          break
      }
    },
    /**
     * 根据传入的key进行排序
     */
    getSortDataFromKey (key) {
      // sort可以完成数组的数据排序
      // 当接收的值为负数的时候 表示good1排列在good2之前
      // 当接收的值为正数的时候，表示good1排列在good2之后
      // 0 不变
      this.sortGoodsData.sort((goods1, goods2) => {
        const v1 = goods1[key]
        const v2 = goods2[key]
        // 对value进行对比
        // boolean类型的值(有货优先和直营优先)
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        // float 类型的值（价格和销量）
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    /**
     * 设置布局，为不同的layoutType设定不同的展示形式
     * 1. 初始化影响到布局的数据
     *    (1) goodsViewHeight -> 垂直布局、网格布局(100%)、瀑布流(实际高度)
     *    (2) goodsItemStyles
     *    (3) imgStyles
     *  2. 为不同的layoutType设置不同的展示类
     */
    initLayout () {
      // 初始化数据
      this.goodsViewHeight = '100%'
      this.goodsItemStyle = []
      this.imgStyles = []
      // 为不同的layoutType设置不同的展示类
      switch (this.layoutType) {
        // 垂直列表
        case 1:
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格布局
        case 2:
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        // 瀑布流布局
        case 3:
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          this.$nextTick(() => {
            // 调用创建瀑布流的方法
            this.initWaterfall()
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        font-size: $infoSize;
        line-height: px2rem(18);
        &-hint {
          color: $hintColor;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}
// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格布局
.goods-grid {
  display: flex;
  padding: $marginSize;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
