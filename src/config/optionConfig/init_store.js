/*
 * @Date: 2019-09-12 15:42:36
 * @information: 最后更新时间
 */
import Vuex from 'vuex'
/**
 * @Author: 周靖松
 * @information: store扫描类
 * @Date: 2019-09-12 17:55:55
 */
export default class InitStore{
    constructor(){
        this.name = 'store'
        // vuex 命名空间
        this.model={
            modules:{}
        }
        // 扫描store文件夹，约定放vuex的文件夹名称是vuex
        this.storeContext = require.context('@/vuex',true,/\.js$/)
    }
    /**
     * @Author: 周靖松
     * @information: 注册store
     * @Date: 2019-09-12 18:35:54
     */
    init(){
        // 判断环境
        let vue = window && window.Vue
        if (!vue) return new Error('当前环境不存在vue')
        let {storeContext}=this
        // 扫描之后的路径
        let pathArr = storeContext.keys()
        // 注册store和明明空间
        pathArr.map(storeContext).forEach((el,index) => {
            // 命名空间名称
            let splicName =pathArr[index].split('/').pop().split('.')[0]
            let context = el.default
            if(!context)return;
            // vuex modules
            this.model.modules[splicName]=context
        });
        // 注册store
        vue.use(Vuex)
        return new Vuex.Store(this.model)
    }
}