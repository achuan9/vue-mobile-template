<template>
  <div>
    <el-form :model="formData" :rules="formRules" ref="form">
      <el-form-item prop="userName">
        <el-input v-model="formData.userName" maxlength="45" placeholder="输入登录用户名">
          <i class="yf icon-user" slot="prepend"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="formData.pwd" maxlength="16" placeholder="输入你的密码">
          <i class="yf icon-lock" slot="prepend"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" inline-message>
        <el-input v-model="formData.captcha" maxlength="6" placeholder="输入图形验证码">
          <i slot="prepend" class="yf icon-check-circle"></i>
          <img slot="append" class="captcha-img" src="https://via.placeholder.com/60x30">
        </el-input>
      </el-form-item>
      <div class="remember-psw">
        <el-checkbox v-model="rememberPSW">记住密码</el-checkbox>
      </div>
      <el-button class="submit-btn" type="primary" @click="submit">确定</el-button>
      <div class="register-tips">
        还没有账号？<el-button type="text" @click="$emit('register')">去注册</el-button>
      </div>
    </el-form>
  </div>
</template>
<script type='text/javascript'>
  export default {
    name: '',
    data() {
      return {
        formData: {
          userName: "",
          pwd: "",
          uuid: "",
          captcha: "" //图形验证码
        },

        formRules: {
          userName: [
            {required: true, trigger: 'blur', message: '请输入用户名'}
          ],
          pwd: [
            {required: true, trigger: 'blur', message: '请输入密码'}
          ],
          captcha: [
            {required: true, trigger: 'blur', message: '请输入图形验证码'}
          ],
        },

        rememberPSW: false,
      }
    },
    computed: {

    },
    created() {

    },
    methods: {
      // 登录页面-将登录功能进行封装，方便使用async/await
      handleSelect(val) {

      },
      submit() {
        this.$refs.form.validate((valid) => valid && this.$emit('submit', this.formData));
      },
    },
  }
</script>
<style lang='scss' scoped>
  .form-menu {
    margin-bottom: 20px;

    .form-menu-item {
      line-height: 80px;
      text-align: center;
      font-size: 18px;
    }
  }
  i.yf {
    display: inline-block;
    width: 16px;
    height: 16px;
    &.icon-user {
      background: url(~@/assets/icon/user.png) 0 0 no-repeat;
      background-size: 16px;
    }
    &.icon-lock {
      background: url(~@/assets/icon/lock.png) 0 0 no-repeat;
      background-size: 16px;
    }
    &.icon-check-circle {
      background: url(~@/assets/icon/check-circle.png) 0 0 no-repeat;
      background-size: 16px;
    }
  }
  .captcha-img {
    height: 34px;
  }

  .submit-btn {
    width: 100%;
    margin-top: 10px;
  }

  .register-tips {
    text-align: center;
    font-size: 12px;
  }
</style>
