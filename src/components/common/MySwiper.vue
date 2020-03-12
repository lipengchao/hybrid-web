<template>
  <div class="myswiper" :style="{paddingBottom: height}">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperImgs" :key="index">
        <img class="swiper-slide-img" :style="{height: height}" :src="slide" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
/**
 * 轮播图组件
 */
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    // slide 高度
    height: {
      type: String,
      default: 'auto'
    },
    // 数据源
    swiperImgs: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // 1: 圆点切换
    // 2: 数字
    paginationType: {
      type: Number,
      default: 1
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // 自动滚动
        autoplay: {
          // 用户触摸后不停止定时器
          disableOnInteraction: false
        },
        disableOnInteraction: false,
        // swiper高度跟随slider变化
        autoHieght: true,
        // 循环播放
        loop: true,
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          // 分页器的样式
          type: 'bullets',
          // 分页器内的元素，添加类名
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  created () {
    this.initPaginLayout()
  },
  methods: {
    initPaginLayout () {
      switch (this.paginationType) {
        //  圆点分页器
        case 1:
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            // 分页器的样式
            type: 'bullets',
            // 分页器内的元素，添加类名
            bulletClass: 'custom-bullet-class'
          }
          break
        //  数字分页器
        case 2:
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            // 分页器的样式(数字)
            type: 'fraction'
          }
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
.myswiper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: px2rem(184);
  background: #fff;
  .swiper-slide-img {
    width: 100%;
  }
  // 圆点分页器
  /deep/.swiper-pagination {
    bottom: px2rem(24);
    .custom-bullet-class {
      display: inline-block;
      width: px2rem(6);
      height: px2rem(6);
      box-sizing: border-box;
      border-radius: 100%;
      border: px2rem(1) solid #fff;
      margin: 0 px2rem(4);
      opacity: 1;
      &.swiper-pagination-bullet-active {
        background-color: #fff;
      }
    }
  }
  // 数字分页器
  /deep/.swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0, 0, 0, 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;
    .swiper-pagination-current {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
}
</style>
