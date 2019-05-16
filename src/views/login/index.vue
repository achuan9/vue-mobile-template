<template>
  <div class="page-login">
    <div class="logo">
      <i class="logo-img"/>
      <p class="logo-text">贵州智慧停车</p>
    </div>
    <form action="javascript:" class="form">
      <div class="input-box">
        <i class="input-icon user"/>
        <input v-model="formData.username" class="input" type="text" placeholder="请输入操作者账号">
      </div>
      <div class="input-box">
        <i class="input-icon password"/>
        <input
          v-model="formData.password"
          class="input"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
        >
        <i class="toggle-btn" :class="{visible: showPassword}" @click="togglePassword"/>
      </div>
      <base-button type="submit" class="submit-btn" @click="loginHandler">登 录</base-button>
    </form>
  </div>
</template>
<script type = 'text/javascript'>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      formData: {
        username: '',
        password: ''
        // username: '18777643476',
        // password: '123456'
      }
    }
  },
  created() {},
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    loginHandler() {
      console.log('----')
      const { username, password } = this.formData
      if (!username) return this.$toast.text('请输入用户名')
      if (!password) return this.$toast.text('请输入密码')
      this.$store.dispatch('user/login', { username, password: md5(password) })
    }
  }
}
</script>
<style lang='scss' scoped>
.page-login {
  padding: 70px 60px 20px;
  .logo {
    margin-bottom: 128px;
    .logo-img {
      display: block;
      width: 100px;
      height: 110px;
      margin: 0 auto 10px;
      @include bg-img("./images/logo");
    }
    .logo-text {
      text-align: center;
      font-size: 28px;
      color: rgb(72, 102, 157);
    }
  }
  .input-box {
    display: flex;
    height: 80px;
    margin-bottom: 34px;
    padding: 0 20px 0 30px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 4px rgba($color: #000000, $alpha: 0.1);
    border-radius: 8px;
    .input-icon {
      width: 36px;
      margin-right: 10px;
      &.user {
        @include bg-img("./images/user");
      }
      &.password {
        @include bg-img("./images/password");
      }
    }
    .toggle-btn {
      width: 32px;
      height: 100%;
      @include bg-img("./images/hidden");
      &.visible {
        @include bg-img("./images/visible");
      }
    }
    .input {
      flex: 1;
      border: none;
      font-size: 24px;
    }
  }
  .submit-btn {
    margin-top: 80px;
  }
}
</style>
