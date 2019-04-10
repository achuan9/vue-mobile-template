<template>
  <div class="page-wrapper">
    <div class="page-cont inner">

      <p class="page-title">标题</p>

      <div class="page-main">
        <!-- 表单box -->
        <div class="page-main-form">

          <h1 class="form-title">{{formTitle}}</h1>

          <form-login @submit="login" @register="formType = 'register'" v-if="formType === 'login'"/>

          <form-register @submit="register" @login="formType = 'login'" v-else/>

        </div>

      </div>
      <p class="page-copyright">©{{year}} {{company}}</p>
    </div>


  </div>
</template>
<script type='text/javascript'>
  import { mapActions } from 'vuex'
  import CONFIG from '@/config';
  import FormLogin from "./components/FormLogin";
  import FormRegister from "./components/FormRegister";
  export default {
    components: {FormLogin, FormRegister},
    data() {
      return {
        year: new Date().getFullYear(),
        company: CONFIG.companyName,
        formType: 'login'


      };
    },
    computed: {
      formTitle() {
        const obj = {'login': '登录', 'register': '注册'}
        return obj[this.formType]
      }
    },
    created() {


    },
    methods: {
      ...mapActions([
        "handleLogin",
        "getUserInfo"
      ]),
      async login(val) {
        console.log(val);

        await this.handleLogin(val)
        this.$router.push('/')
      },
      async register(val) {
        console.log(val)
      }


    }
  };
</script>

<style lang='scss' scoped>
@import '~@/assets/style/tools.scss';
  $form-width: 400px; //登录表单的宽度
  $form-pad-lr: 40px; //登录表单的左右padding

  .page-wrapper {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: url(./images/login-bg-bottom.png) top center no-repeat;
    background-size: cover;
    @include center-tl;

    .page-cont {
      width: 100%;

      .page-title {
        display: block;
        width: 574px;
        margin: 0 auto;
        text-align: center;
      }

      .page-main {
        position: relative;
        width: 100%;
        height: 600px;
        margin: 26px 0;
        background: url(./images/login-bg.jpg) top center no-repeat;
        background-size: cover;

      }

      .page-copyright {
        font-size: 14px;
        text-align: center;
        color: #aaa;
      }

      @media screen and (max-width: 1440px) {
        .page-title {
          width: 480px;
        }

        .page-main {
          height: 500px;
        }
      }
    }

  }

  // 表单
  .page-main-form {
    position: absolute;
    top: 50%;
    right: 17%;
    transform: translateY(-50%);
    width: $form-width;
    padding: 0 $form-pad-lr 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    .form-title {
      height: 61px;
      line-height: 80px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 18px;
    }
  }


</style>
