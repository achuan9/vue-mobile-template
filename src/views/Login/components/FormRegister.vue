<template>
  <div>
    
   <el-form :model="formData" :rules="formRules" ref="form">
            <el-form-item prop="userName">
              <el-input v-model="formData.userName" maxlength="45" placeholder="请输入手机号码">
                <i class="yf icon-mobile" slot="prepend"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="formData.pwd" maxlength="16" placeholder="请输入你的密码">
                <i class="yf icon-lock" slot="prepend"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha" inline-message>
              <el-input v-model="formData.captcha" maxlength="6" placeholder="输入短信验证码">
                <i slot="prepend" class="yf icon-check-circle"></i>
                <el-button slot="append" :disabled="disableCodeBtn" @click="getCode">{{disableCodeBtn ? `${timer}s` : '获取验证码'}}</el-button>
              </el-input>
            </el-form-item>
            <el-button class="submit-btn" type="primary" @click="submit">确定</el-button>
            <div class="register-tips">
              已有账号？<el-button type="text" @click="$emit('login')">去登录</el-button>
            </div>
          </el-form>
  </div>
</template>
<script type = 'text/javascript'>
const CODE_INTERVAL = 30;
  export default {
    name: '',
    data() {
      return {
        formData: {
          userName: "",
          pwd: "",
          captcha: "" //图形验证码
        },

        formRules: {
          userName: [
            {required: true, trigger: 'blur', message: '请输入手机号'}
          ],
          pwd: [
            {required: true, trigger: 'blur', message: '请输入密码'}
          ],
          captcha: [
            {required: true, trigger: 'blur', message: '请输入图形验证码'}
          ],
        },
        timer: CODE_INTERVAL,
        disableCodeBtn: false,
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      submit() {
        this.$refs.form.validate((valid) => valid && this.$emit('submit', this.formData));
      },
      getCode() {
        this.disableCodeBtn = true;
        this.interval = null;
        this.interval = setInterval(() => {
          this.timer--;
          this.timer === 0 && this.resetCode()
        }, 1000);
      },
      resetCode() {
        clearInterval(this.interval)
        this.interval = null;
        this.disableCodeBtn = false;
        this.timer = CODE_INTERVAL
      }
    },
    
    beforeDestroy() {
      this.resetCode()
    }
  }
</script>
<style lang='scss' scoped>
  
  .captcha-img {
    width: 50px;
  }

  .submit-btn {
    width: 100%;
    margin-top: 10px;
  }

  .register-tips {
    text-align: center;
    font-size: 12px;
  }
  i.yf {
    display: inline-block;
    width: 16px;
    height: 16px;
    &.icon-mobile {
      background: url(~@/assets/icon/mobile.png) 0 0 no-repeat;
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
</style>