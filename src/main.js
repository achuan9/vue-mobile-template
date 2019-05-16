import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components' // 全局组件
import directives from '@/directives' // 全局指令
import '@/ui-library' // 组件库
import '@/styles/index.scss' // 全局样式
import '@/utils/fixWechatKeyboard' // 修复微信软键盘收起页面不回弹
// import jsCookie from 'js-cookie'
// import jsMd5 from 'js-md5'

// window.c = jsCookie.get('haahhh')
// window.md = jsMd5('124332423')

Vue.use(components)
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
