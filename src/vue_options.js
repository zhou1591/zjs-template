/*
 * @Date: 2019-09-19 11:13:41
 * @information: 最后更新时间
 */
// 引入配置文件
import optionArr from '@/config/optionConfig'

// vue 选项
const vueOptions = {}
// 添加选项
optionArr.forEach(el => {
  let optionObj = new el()
  let {name} = optionObj
  vueOptions[name]=optionObj.init()
})
 
export default vueOptions