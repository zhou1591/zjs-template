/*
 * @Date: 2019-09-18 18:18:45
 * @information: 最后更新时间
 */
// 引入组件扫描
import  componentsScan  from './scan_components'
// 引入自定义指令扫描
import  directivesScan  from './scan_directives'
// 引入混入扫描
import  initMixins  from './init_mixins'
// 引入axios配置
import  initAxios  from './init_axios'
// 扫描数组
let scanArr = [componentsScan,directivesScan,initAxios,initMixins]
let install = _ => {
    scanArr.forEach(el=>{
        new el().init()
    })
}
export default install
