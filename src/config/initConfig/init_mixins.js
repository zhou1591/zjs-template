/*
 * @Date: 2019-10-01 17:03:54
 * @information: 最后更新时间
 */
/**
 * @Author: 周靖松
 * @information: 自定义混入
 * @Date: 2019-10-01 17:04:10
 */
export default class InitMixins {
  constructor() {
    // 扫描混入文件夹，约定放组件的文件夹名称是mixins
    this.mixins = require.context('@/mixins', true, /\.js$/);
  }
  /**
   * @Author: 周靖松
   * @information: 注册混入
   * @Date: 2019-10-01 18:06:24
   */
  init() {
    // 判断环境
    let vue = window && window.Vue;
    if (!vue) return new Error('当前环境不存在vue');
    let { mixins } = this;
    // 混入文件名
    let mixinsPath =  mixins.keys()
    // 注册混入
    mixinsPath.map(mixins).forEach((el,index) => {
        let context=el.default
        let mixinsName =mixinsPath[index].split('/').pop().split('.')[0]
        if(mixinsName=='mixin_config'){
          // Object.entries(context).forEach(el=>{
          //   let a = Object.values(el)
          //   console.log(a)
          // })
          // let a = '@'
          // import()
          // return 
        };
       
        // console.log(context)
      
        // let directiveName =mixins[index].split('/').pop().split('.')[0]
        // vue.directive(directiveName,context)
    });
    // throw('1243')
  }
}