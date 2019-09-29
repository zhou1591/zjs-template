/*
 * @Date: 2019-09-11 18:37:00
 * @information: 最后更新时间
 */
const fun = {
  inserted(...argument) {
    //  dom节点，binding属性
    let [el,banding] = argument;
    //  获取到元素绑定数据
    let permis = el.getAttribute("limit");
    //  权限列表
    let {value:permisList} = banding;
    //  当前权限是否存在
    let flag = permisList.includes(permis);
    //  如果不存在，删除节点
    !flag && el.parentNode && el.parentNode.removeChild(el);
  }
}
export default fun
