<template>
  <div class="home">
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
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/common/MySwiper'
import Activity from '@c/common/Activity'
import ModeOptions from '@c/common/ModeOptions'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions
  },
  data () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityData: []
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
        this.$http.get('/activitys')
      ]).then(this.$http.spread((swiperData, activityData) => {
        this.swiperData = swiperData.list
        this.activityData = activityData.list
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
