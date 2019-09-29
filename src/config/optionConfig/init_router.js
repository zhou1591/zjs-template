/*
 * @Date: 2019-09-18 18:58:20
 * @information: 最后更新时间
 */
import Router from 'vue-router'
// 路由配置
const routerOption = {
  routes: [{
    path: '/', //主页
    name: 'Hello',
    component: () => import('@/views/Hello'),
    meta: {
      title: '主页'
    }
  }]
}

export default class InitRouter {
  constructor() {
    this.routerOption = routerOption
    this.name = 'router'
  }
  /**
   * @Author: 周靖松
   * @information: 注册路由
   * @Date: 2019-09-18 19:02:42
   */
  init(){
    // 判断环境
    let vue = window && window.Vue
    if (!vue) return new Error('当前环境不存在vue')
    let { routerOption } =this
    vue.use(Router)
    return new Router(routerOption)
  }
}

