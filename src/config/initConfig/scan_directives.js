/*
 * @Date: 2019-09-12 15:40:33
 * @information: 最后更新时间
 */
/**
 * @Author: 周靖松
 * @information: 自定义指令扫描类
 * @Date: 2019-09-12 18:53:37
 */
export default class ScanDirectives{
    constructor(){
        // 扫描组件文件夹，约定放组件的文件夹名称是directives
        this.directives = require.context('@/directives', true, /\.js$/)
    }
    /**
     * @Author: 周靖松
     * @information: 注册自定义指令
     * @Date: 2019-09-12 18:35:44
     */
    init(){
        // 判断环境
        let vue = window && window.Vue
        if (!vue) return new Error('当前环境不存在vue')
        let {directives}=this
        // 注册自定义指令
        let directivesPath =  directives.keys()
        directivesPath.map(directives).forEach((el,index) => {
            let context=el.default
            let directiveName =directivesPath[index].split('/').pop().split('.')[0]
            vue.directive(directiveName,context)
        });
    }
}