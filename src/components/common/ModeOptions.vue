<template>
  <div class="mode-options">
    <div class="mode-options-item" v-for="item in dataSource" :key="item.id">
      <img class="mode-options-item-icon" :src="item.icon" alt="">
      <p class="mode-options-item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataSource: [
        {
          id: 1,
          icon: require('@imgs/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: 2,
          icon: require('@imgs/haiTunQuanQiu.png'),
          title: '海豚全球'
        },
        {
          id: 3,
          icon: require('@imgs/jingDongFuShi.png'),
          title: '京东服饰'
        },
        {
          id: 4,
          icon: require('@imgs/jingDongShengXian.png'),
          title: '京东生鲜'
        },
        {
          id: 5,
          icon: require('@imgs/jingDongDaoJia.png'),
          title: '京东到家'
        },
        {
          id: 6,
          icon: require('@imgs/jingDongChaoShi.png'),
          title: '充值缴费'
        },
        {
          id: 7,
          icon: require('@imgs/jingDongChaoShi.png'),
          title: '9.9元拼'
        },
        {
          id: 8,
          icon: require('@imgs/lingJuan.png'),
          title: '领券'
        },
        {
          id: 9,
          icon: require('@imgs/zhuanQian.png'),
          title: '赚钱'
        },
        {
          id: 10,
          icon: require('@imgs/quanBu.png'),
          title: '全部'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.mode-options {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding-bottom: px2rem(14);
  &-item {
    margin-top: px2rem(10);
    width: 20%;
    text-align: center;
    &-icon {
      width: px2rem(40);
      height: px2rem(40);
    }
    &-title {
      margin-top: px2rem(6);
      font-size: $minInfoSize
    }
  }
}
</style>
