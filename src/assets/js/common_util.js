/*
 * @Date: 2019-08-29 10:22:43
 * @information: 最后更新时间
 */
import Vue from 'vue'

export default {
  /**
   * 消息提示框
   * 新增、修改、删除、审核、驳回等操作调用该提示框
   * @param type 只有success和warning
   **/
  setMessage: function (type, message, showClose) {
    Vue.prototype.$message({
      showClose: showClose,
      message: message,
      type: type,
      duration: 2000
    })
  },
  /**
   * @author: 周靖松
   * @information: 导出excel
   * @Date: 2019-04-07 16:33:44
   */
  downFile(res, name) {
    const blob = new Blob([res]);
    const elink = document.createElement('a');
    elink.download = `${name}.xls`;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    // 释放URL 对象
    URL.revokeObjectURL(elink.href);
    // 移除dom
    document.body.removeChild(elink);
  },
  /**
   * @author: 周靖松
   * @information:  字段交换赋值动作
   * @Date: 2019-08-23 15:39:28
   */
  copySave(orgin, config, target) {
    // 目标源默认是form
    let targetObj = target || 'form'
    // 目标源是否为当前对象
    targetObj = typeof targetObj == 'string' ? this[targetObj] : targetObj
    // 赋值源是否在this
    let orginObj = typeof orgin == 'string' ? this[orgin] : orgin
    // 对应赋值
    Object.entries(config).forEach(el => {
      targetObj[el[0]] = orginObj[el[1]]
    })
  },
}
