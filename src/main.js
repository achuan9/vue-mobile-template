import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import components from '@/components';
import filters from '@/filters';
import "@/element-ui";
import '@/assets/style/index.scss';

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/http/mock')


Vue.use(components)

//全局filter
for (const item in filters) {
  Vue.filter(item, filters[item])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
