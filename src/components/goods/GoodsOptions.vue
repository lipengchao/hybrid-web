<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item"  v-for="(item, index) in optionsDatas" :key="index">
        <a class="goods-options-list-item-content" @click.stop.prevent="onOptionsItemClick(item, index)">
          <span class="goods-options-list-item-content-name" :class="{'goods-options-list-item-content-name-active' : selectOption.id === item.id}">{{ item.name }}</span>
          <span class="goods-options-list-item-content-caret caret" :class="[isShowSubContent && selectOption.id === item.id ? 'goods-options-list-item-content-caret-open': 'goods-options-list-item-content-caret-close']" v-if="item.subs.length > 0"></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <transition name="fold-height">
       <div class="options-sub z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-list">
          <li class="options-sub-list-item" v-for="(item, index) in selectOption.subs" :key="index">
            <a class="options-sub-list-item-content" @click.stop.prevent="onSubOptionsItemClick(item, index)">
              <span class="options-sub-list-item-content-name" :class="{'options-sub-list-item-content-name-active' : selectOption.id === item.id}">{{ item.name }}</span>
              <img class="options-sub-list-item-content-select" src="@imgs/options-select.svg" v-show="selectOption.id === item.id">
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选项数据源
      optionsDatas: [
        {
          id: '1-1',
          name: '默认',
          subs: [
            {
              id: '1-1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 选中的筛选项
      selectOption: {},
      // 标记子选项是否处于展开状态
      isShowSubContent: false
    }
  },
  created () {
    this.selectOption = this.optionsDatas[0]
  },
  methods: {
    /**
     * 一级选项点击事件
     * 1. 如果子选项处于展开状态，则关闭子选项视图
     * 2. 筛选项(item)包含子选项(sub.lenght > 0)
     * 并且当前item处于一个选中状态下的时候(item.id === selectOption.id)，展示子选项视图
     * 3. 设置选中项为用户点击的item
     */
    onOptionsItemClick (item, index) {
      // 如果子选项处于展开状态，则关闭子选项视图
      // 需要标记子选项是否展开 isShowSubContent
      if (item.subs.length) {
        this.isShowSubContent = !this.isShowSubContent
      } else {
        this.isShowSubContent = false
      }
      // 展示子视图
      // 1. item 包含子选项(subs.length > 0)
      // 2. 当前item处于一个选中状态下的时候(item.id === selectOption.id)，展示子选项视图
      // 设置选中项为用户点击的item
      this.selectOption = item
      this.$emit('optionsChange', this.selectOption.id)
    },
    /**
     * 子选项点击事件
     * 1. 设置选中项为用户点击的选项item
     * 2. 将选中项置顶到一级选项
     * 3. 关闭子选项视图
     */
    onSubOptionsItemClick (item, index) {
      this.selectOption.id = item.id
      this.selectOption.name = item.name
      this.isShowSubContent = false
      this.$emit('optionsChange', this.selectOption.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;
  // 一级选项css
  &-list {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: #fff;
    &-item {
      flex-grow: 1;
      &-content {
        @include center();
        height: 100%;
        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;
          &-active {
            color: $mainColor;
          }
        }
        // 子选项展开时，三角形的动画
        &-caret {
          // 子选项展开时，三角形的动画
          &-open {
            transform: rotate(-180deg);
            transition: all .3s;
          }
          // 子选项关闭时，三角形的动画
          &-close {
            transform: rotate(0deg);
            transition: all .3s;
          }
        }
      }
    }
  }
  // 子选项css
  .options-sub {
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;
          &-name {
            display: inline-block;
            flex: 1;
            font-size: $infoSize;
            &-active {
              color: $mainColor;
            }
          }
          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
  // 子选项内容展开的动画
  .fold-height-enter-active {
    animation-duration: .3s;
    animation-name: fold-height-open;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }
  // 子选项内容关闭的动画
  .fold-height-leave-active {
    animation-duration: .3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }
}
</style>
