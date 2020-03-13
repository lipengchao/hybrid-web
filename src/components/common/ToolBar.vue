<template>
  <div class="tool-bar">
    <!-- tab按钮 -->
    <div
      class="tool-bar-item"
      v-for="(item, index) in toolBarData"
      :key="index"
      @click="onChangeFragment(item, index)"
    >
      <!-- 如果index === selectItemIndex 就显示高亮图片 -->
      <img class="tool-bar-item-img" :src="index === selectItemIndex ? item.hIcon : item.nIcon" alt="">
      <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h' : index === selectItemIndex}">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
/**
 * ToolBar的功能
 * 1. 永远位于页面的最底部
 * 2. 点击toolBar按钮的时候，页面发生对应的切换
 * 3. 按钮分为默认和选中两个状态
 *
 * -------------------
 *
 * 能力和约束（对应上面的功能）
 * 1. 不具备的能力（约束）
 * 2. 通过一个回调，告诉父组件，按钮的点击事件
 * 3. 当按钮被选中的时候，应该切换按钮的状态
 *
 */
export default {
  data () {
    return {
      // tab 按钮数据源
      toolBarData: [
        {
          // 默认状态下的图片
          nIcon: require('@imgs/home-n.svg'),
          // 高亮状态的图片
          hIcon: require('@imgs/home-h.svg'),
          // 名称
          name: '首页',
          // 组件名称
          componentName: 'home'
        },
        {
          // 默认状态下的图片
          nIcon: require('@imgs/shopping-n.svg'),
          // 高亮状态的图片
          hIcon: require('@imgs/shopping-h.svg'),
          // 名称
          name: '购物车',
          // 组件名称
          componentName: 'shopping'
        },
        {
          // 默认状态下的图片
          nIcon: require('@imgs/my-n.svg'),
          // 高亮状态的图片
          hIcon: require('@imgs/my-h.svg'),
          // 名称
          name: '我的',
          // 组件名称
          componentName: 'my'
        }
      ],
      // 选中的tab按钮
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    /**
     * 指定切换tab页
     */
    pushFragment (index) {
      // 调用onChangeFragment切换对应的tab
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style';
.tool-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(42);
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 0 px2rem(16) 0 rgba($color: #000000, $alpha: .2);
  border-top: 1px solid #e5e5e5;
  z-index: 20;
  &-item {
    @include columnCenter();
    &-img {
      width: px2rem(20);
      height: px2rem(20)
    }
    &-name {
      margin-top: px2rem(4);
      font-size: $minInfoSize;
      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
