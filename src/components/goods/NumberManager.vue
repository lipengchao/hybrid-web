<template>
  <!--
    数量控制器
      只需要负责对数量的逻辑处理，而不需要管其它的东西
   -->
   <div class="number-manager">
     <span class="number-manager-less" :class="{'number-manager-disabled': number === 1}" @click="onLessClick">-</span>
     <span class="number-manager-number">{{ number }}</span>
     <span class="number-manager-less" @click="onAddClick">+</span>
   </div>
</template>

<script>
export default {
  props: {
    // 父组件指定的默认数量
    defaulNumber: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // 数量数据源
      number: 1
    }
  },
  watch: {
    defaulNumber (newV) {
      this.number = this.defaulNumber
    },
    number (newV) {
      this.$emit('onChangeNumber', newV)
    }
  },
  methods: {
    /**
     * 减号按钮点击事件
     */
    onLessClick () {
      if (this.number === 1) {
        return
      }
      this.number--
    },
    /**
     * 加号按钮点击事件
     */
    onAddClick () {
      this.number++
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.number-manager {
  display: flex;
  height: px2rem(20);
  line-height: px2rem(20);
  font-size: $infoSize;
  span {
    display: inline-block;
    width: px2rem(30);
    text-align: center;
    font-weight: 500;
  }
  &-number {
    padding: 0 px2rem(4);
    background-color: $bgColor;
  }
  &-disabled {
    color: $hintColor;
  }
}
</style>
