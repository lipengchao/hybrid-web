<template>
  <!--
    1. 创建结构，让item相对于goods进行排列
    2. 生成不同高度的图片，撑起不同高度的item
    3. 计算item的位置，来达到从上到下，从左到右依次排列的目的
   -->
  <div class="goods goods-waterfall" :style="{height: goodsViewHeight}">
    <div
      class="goods-item goods-waterfall-item"
      v-for="(item, index) in dataSource"
      :key="item.id"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
    >
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
      <!-- 秒数 -->
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
  data () {
    return {
      dataSource: [],
      // 图片样式集合
      imgStyles: [],
      // item样式集合
      goodsItemStyles: [],
      // goods组件的高度
      goodsViewHeight: 0
    }
  },
  created () {
    this.initData()
  },
  methods: {
    /**
     * 获取数据
     */
    initData () {
      this.$http.get('/goods')
        .then(data => {
          this.dataSource = data.list
          this.initImgStyles()
          this.$nextTick(() => {
            // 调用创建瀑布流的方法
            this.initWaterfall()
          })
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
      // 对比左右两侧最大的高度，最大的高度为goods组件的高度
      this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  background-color: $bgColor;
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
