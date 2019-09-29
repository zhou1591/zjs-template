/*
 * @Date: 2019-09-12 11:04:15
 * @information: 最后更新时间
 */
// 引入扫描配置
import initConfig from '@/config/initConfig'
// 初始化数组
let initArr = [initConfig]

let install = _ => {
    // 判断环境
    let vue = window && window.Vue
    if (!vue) return new Error('当前环境不存在vue')
    // 注册配置文件
    initArr.forEach(el=>{
        vue.use(el)
    })
}
export default install 
