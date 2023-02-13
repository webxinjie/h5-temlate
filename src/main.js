import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import from 'lib-flexible';
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.less'
// filters
import './filters'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
