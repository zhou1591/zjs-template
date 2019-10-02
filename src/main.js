/*
 * @Date: 2019-08-29 10:22:43
 * @information: 最后更新时间
 */
import Vue from 'vue'
import App from './App'
import vueInit from "@/vue_init.js"
import vueOptions from '@/vue_options.js'
import elementUI from 'element-ui'
import zjsMethods from 'zjsmethods'
// 引入样式
import './style/index.scss';

Vue.use(elementUI)
Vue.use(vueInit)
// 引入方法包
Vue.use(zjsMethods)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ...vueOptions,
  components: { App },
  template: '<App/>'
})
