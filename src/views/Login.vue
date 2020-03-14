<template>
  <div class="login">
    <navigation-bar pageName="登录" :isShowBack="true" @onLeftClick="onBackClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="login-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="请输入用户名"/>
      </div>
      <div class="input-container">
        <input v-model="password" type="password" placeholder="请输入密码"/>
      </div>
      <div class="login-content-login page-commit" @click="onLoginClick">登录</div>
      <a class="login-content-register" @click="onToRegisterClick">注册新用户</a>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import { mapMutations } from 'vuex'
import md5 from '@js/md5.min.js'
export default {
  name: 'Login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      mdsPassword: ''
    }
  },
  methods: {
    // 后退事件
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 登录按钮
     */
    onLoginClick () {
      // 判断用户输入的合法性
      if (this.username.length === 0 || this.password.length === 0) {
        return alert('用户名或密码为空')
      }
      // 与原生交互，验证用户输入的用户名和密码
      // 对于用户输入的密码进行md5加密
      this.md5Password = md5(this.password)
      // 判断当前设备是Android还是ios
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else if (window.webkit) {
        // window下存在webkit对象代表是ios
        this.onLoginToIOS()
      }
    },
    /**
     * 立即注册点击事件
     */
    onToRegisterClick () {
      this.$router.push({ name: 'Register' })
    },
    /**
     * 调用Android登录接口
     */
    onLoginToAndroid () {
      // json 字符串
      const userJson = JSON.stringify({
        username: this.username,
        password: this.md5Password
      })
      const result = window.androidJSBridge.login(userJson)
      this.onLoginCallback(result)
    },
    /**
   * 调用IOS登录接口
   */
    onLoginToIOS () {
      //  IOS可以直接接收对象类型参数
      const userObj = {
        username: this.username,
        password: this.md5Password
      }
      // 回调方法
      window.loginCallback = this.onLoginCallback
      // 调用ios登录接口
      window.webkit.messageHandlers.login.postMessage(userObj)
    },
    /**
     * 用来处理Native登录接口返回值
     */
    onLoginCallback (result) {
      switch (result) {
        case '-1':
          alert('系统内容部错误')
          break
        case '0':
          // 保存主动登录的用户名到username
          this.setUsername(this.username)
          this.onBackClick()
          break
        case '1':
          alert('用户名不存在')
          break
        case '2':
          alert('用户密码错误')
          break
        default:
          break
      }
    },
    ...mapMutations({
      setUsername: 'setUsername'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  &-content {
    width: 100%;
    height: 100%;
    &-login {
      margin-top: 40%;
    }
    &-register {
      float: right;
      margin-top: $marginSize;
      padding: $marginSize;
      font-size: $infoSize;
      color: $hintColor;
    }
  }
}
</style>
