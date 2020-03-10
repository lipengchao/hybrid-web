<template>
  <div class="home">
    <div class="home-content">
      <!-- 轮播图 -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity class="activity">
        <div class="activity-520">
          <img class="activity-520-img" v-for="(item, index) in activityData" :key="index" :src="item.icon" alt="">
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀 -->
      <seconds :dataSource="secondsData"></seconds>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/common/MySwiper'
import Activity from '@c/common/Activity'
import ModeOptions from '@c/common/ModeOptions'
import Seconds from '@c/seconds/Seconds'
import { px2rem } from '@js/utils'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds
  },
  data () {
    return {
      // 轮播图图数据
      swiperData: [],
      swiperHeight: px2rem(184),
      // 活动数据
      activityData: [],
      secondsData: []
    }
  },
  computed: {
    swiperImgs () {
      return this.swiperData.map(item => item.icon)
    }
  },
  created () {
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
  }
}
</style>
