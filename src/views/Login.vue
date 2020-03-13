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
export default {
  name: 'Login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: ''
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
    },
    /**
     * 立即注册点击事件
     */
    onToRegisterClick () {
      this.$router.push({ name: 'Register' })
    }
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
