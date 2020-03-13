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
export default {
  name: 'Register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
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
