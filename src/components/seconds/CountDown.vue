<template>
  <div class="count-down">
    <span class="count-down-end-time">{{ endHours }}点场</span>
    <span class="count-down-surplus">{{ surplus | filterTime }}</span>
  </div>
</template>

<script>
/**
 * 功能：传递给组件一个活动开始时间，组件根据这个时间去进行计算
 * 1、当前时间未到开始时间的时候：展示倒计时
 * 2、当前时间到了开始时间的时候：活动进行中
 * 3、当前时间超过开始时间的时候，活动已结束
 */
export default {
  props: {
    // 活动开始时间
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      interval: null
    }
  },
  created () {
    this.computedSurplusTime()
  },
  methods: {
    /**
     * 计算展示内容
     */
    computedSurplusTime () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      // 当前时间
      const date = new Date()
      // 当前时间超过开始时间，活动结束
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      // 当前时间到了开始时间的时候：活动进行中
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      // 当前时间未到开始时间的时候：展示倒计时
      // 1. 获取当前时间与活动开始时间的秒数差距
      // 2. 根据秒数来转化为对应的格式 时：分：秒

      // 开始时间16，当前时间12  差距应该是3小时59分59秒不应该是4小时
      const diffHours = this.endHours - date.getHours() - 1
      // 差距分钟数
      const diffMinutes = 60 - date.getMinutes() - 1
      // 差距秒数
      const diffSeconds = 60 - date.getSeconds()
      // 转化为对应的秒数 -> 1小时 === 3600
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      // 当前时间每过一秒差距应该-1
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    /**
     * 根据当前的秒数来转化为对应的 时分秒格式
     */
    diffSeconds (newV) {
      // 当前秒数 / 3600, 向下取整,转化为小时数
      const hours = Math.floor(newV / 3600)
      // 当前秒数 / 60, 向下取整,获取到所有分钟数
      // 对60取模，超过小时数的分钟数
      const minutes = Math.floor(newV / 60) % 60
      // 当前的秒数 % 60, 获取到超过小时数，分钟数的秒数
      const seconds = newV % 60
      // 拼装数据
      this.surplus = hours + ':' + minutes + ':' + seconds
      // 在当前秒数变为0，需要修改展示数据
      if (newV === 0) {
        this.computedSurplusTime()
      }
    },
    /**
     * 监听传入的时间是否有变化，如果变化重新调用computedSurplusTime
     */
    endHours () {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.count-down {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }
  &-surplus {
    background-color: #fff;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
