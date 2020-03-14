<template>
  <div class="register">
    <navigation-bar pageName="注册" :isShowBack="true" @onLeftClick="onBackClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="register-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="请输入用户名">
      </div>
      <div class="input-container">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <div class="input-container">
        <input v-model="confirmPassword" type="password" placeholder="请确认密码">
      </div>
      <!-- 注册按钮 -->
      <div class="register-content-register page-commit" @click="onRegister">注册</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/common/NavigationBar'
import md5 from '@js/md5.min.js'
export default {
  name: 'Register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    // 后退事件
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 注册按钮点击事件
     */
    onRegister () {
      // 判断用户输入的合法性
      if (this.username.length === 0) {
        return alert('请输入用户名')
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        return alert('请完善密码')
      }
      // 与原生交互，验证用户输入的用户名和密码
      // 对于用户输入的密码进行md5加密
      this.md5Password = md5(this.password)

      // 判断当前设备是Android还是ios
      if (window.androidJSBridge) {
        this.onRegisterToAndroid()
      } else if (window.webkit) {
        // window下存在webkit对象代表是ios
        this.onRegisterToIOS()
      }
    },
    /**
     * 调用Android注册接口
     */
    onRegisterToAndroid () {
      // json 字符串
      const userJson = JSON.stringify({
        username: this.username,
        password: this.md5Password
      })
      const result = window.androidJSBridge.register(userJson)
      // 对返回值进行处理
      this.onRegisterCallback(result)
    },
    /**
     * 调用IOS注册接口
     */
    onRegisterToIOS () {
      //  IOS可以直接接收对象类型参数
      const userObj = {
        username: this.username,
        password: this.md5Password
      }
      // ios不能直接返回返回值，ios操作完成之后会回调对应的回调方法
      // 同时原生调用js的方法只能是调用绑定到window对象中的
      // 回调方法是registerCallback绑定到window上
      window.registerCallback = this.onRegisterCallback

      // 调用ios注册方法
      window.webkit.messageHandlers.register.postMessage(userObj)
    },
    /**
     * 用来处理Native注册接口返回值
     */
    onRegisterCallback (result) {
      if (result) {
        alert('注册成功')
        this.onBackClick()
      } else {
        alert('注册失败，请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  &-content {
    width: 100%;
    height: 100%;
    &-register {
      margin-top: 40%;
    }
  }
}
</style>
