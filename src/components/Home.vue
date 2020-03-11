<template>
  <div class="home" @scroll="onScrollChange">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon">
        </search>
      </template>
      <!-- 右侧插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- 轮播图 -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img class="activity-520-img" v-for="(item, index) in activityData" :key="index" :src="item.icon" alt="">
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀 -->
      <seconds :dataSource="secondsData"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pingou-jie">
          <img class="activity-pingou-jie-img" src="@imgs/pinGouJie.gif" alt="">
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods :layoutType="3" :isScroll="false"></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/common/MySwiper'
import Activity from '@c/common/Activity'
import ModeOptions from '@c/common/ModeOptions'
import NavigationBar from '@c/common/NavigationBar'
import Search from '@c/common/Search'
import Seconds from '@c/seconds/Seconds'
import Goods from '@c/goods/Goods'
import { px2rem } from '@js/utils'
// 锚点值
const ANCHOR_SCROLL_TOP = 160
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data () {
    return {
      // 轮播图图数据
      swiperData: [],
      swiperHeight: px2rem(184),
      // 活动数据
      activityData: [],
      // 秒杀数据
      secondsData: [],
      // 搜索框样式
      bgColor: '#fff',
      hintColor: '#999999',
      icon: require('@imgs/search.svg'),
      // navBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式
      // 和页面滑动到锚定点之后的插槽的样式(高亮样式)
      navBarSlotStyle: {
        // 默认样式
        normal: {
          // 左侧插槽
          leftIcon: require('@imgs/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@imgs/search.svg')
          },
          // 右侧插槽
          rightIcon: require('@imgs/message-white.svg')
        },
        // 高亮样式
        hightlight: {
          // 左侧插槽
          leftIcon: require('@imgs/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@imgs/search-white.svg')
          },
          // 右侧插槽
          rightIcon: require('@imgs/message.svg')
        }
      },
      // navBar当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // navBar的定制样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1
    }
  },
  computed: {
    swiperImgs () {
      return this.swiperData.map(item => item.icon)
    }
  },
  created () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  methods: {
    // 获取数据
    initData () {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityData, secondsData) => {
        this.swiperData = swiperData.list
        this.activityData = activityData.list
        this.secondsData = secondsData.list
      }))
    },
    /**
     * 监听页面滚动
     * 1. 获取到当前页面滚动的距离
     * 2. 计算navBar背景颜色(navBar背景透明度)
     *    当前滚动的距离 / 锚点值 = navBar背景透明度 opacity
     * 3. opacity > 1, 当前滚动的距离已经等于或者超过了锚点值，当前navBar插槽的样式变为高亮状态的样式
     *    否则的话 opacity < 1 ，当前navBar插槽的样式为默认状态的样式
     */
    onScrollChange ($event) {
      console.log(11)
      // 获取当前页面滚动的距离
      this.scrollTopValue = $event.target.scrollTop
      // this.scrollTopValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 计算navBar背景颜色(navBar背景透明度)
      const opacity = this.scrollTopValue / ANCHOR_SCROLL_TOP
      // 指定navBar插槽样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.hightlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      // 根据透明比例来设置navBar的背景颜色
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      &-img {
        display: inline-block;
        width: 33.33%;
      }
    }
    .activity-pingou-jie {
      background-color: white;
      margin-top: $marginSize;
      &-img {
        width: 100%;
      }
    }
  }
}
</style>
