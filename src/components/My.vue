<template>
  <div class="my">
    <navigation-bar pageName="个人中心" :isShowBack="false"></navigation-bar>
    <div class="my-content">
      <!-- 头像区域 -->
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avatar" src="@imgs/avater.png" alt="">
        <p class="my-content-header-login">{{username ? username : '登录/注册'}}</p>
      </div>
      <!-- 工具栏区域 -->
      <div class="my-content-tools">
        <div class="my-content-tools-item" v-for="(item, index) in toolsData" :key="index">
          <p class="my-content-tools-item-name">{{item}}</p>
          <img class="my-content-tools-item-arrow" src="@imgs/right-arrow.svg" alt="">
        </div>
      </div>
      <!-- 存在登录用户，展示用户退出登录按钮 -->
      <div class="my-content-logout page-commit" v-if="username" @click="logoutClick">退出登录</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      // 工具栏数据
      toolsData: [
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    onLoginClick () {
      this.$router.push({ name: 'Login' })
    },
    /**
     * 退出登录
     */
    logoutClick () {
      // 判断当前设备是Android还是ios
      if (window.androidJSBridge) {
        this.onLogoutToAndroid()
      } else if (window.webkit) {
        // window下存在webkit对象代表是ios
        this.onLogoutToIOS()
      }
    },
    onLogoutToAndroid () {
      // 调用android退出登录接口
      const result = window.androidJSBridge.logout()
      this.onLogoutCallback(result)
    },
    onLogoutToIOS () {
      // 指定回调方法
      window.logoutCallback = this.onLogoutCallback
      // 调用ios退出登录接口
      window.webkit.messageHandlers.logout.postMessage({})
    },
    /**
     * 处理退出登录的返回值
     */
    onLogoutCallback (resullt) {
      if (resullt) {
        this.clearUsername()
        alert('退出登录成功')
      } else {
        alert('操作失败，请重试')
      }
    },
    ...mapMutations({
      clearUsername: 'clearUsername'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  background-color: $bgColor;
  &-content {
    height: 100%;
    width: 100%;
    // 头部区域
    &-header {
      display: flex;
      align-items: center;
      margin-top: $marginSize;
      padding: $marginSize;
      height: px2rem(68);
      border-top: px2rem(1) solid $lineColor;
      border-bottom: px2rem(1) solid $lineColor;
      background-color: white;
      &-avatar {
        width: px2rem(52);
        height: px2rem(52);
      }
      &-login {
        margin-left: $marginSize;
        font-size: $titleSize;
      }
    }
    // 工具栏
    &-tools {
      &-item {
        display: flex;
        padding: $marginSize;
        height: px2rem(46);
        align-items: center;
        box-sizing: border-box;
        border-bottom: px2rem(1) solid $lineColor;
        background-color: white;
        &-name {
          font-size: $infoSize;
          flex-grow: 1;
        }
        &-arrow {
          width: px2rem(16);
        }
      }
    }
    // 退出登录按钮
    &-logout {
      margin-top: 20%;
    }
  }
}
</style>
