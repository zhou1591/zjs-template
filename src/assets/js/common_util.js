/*
 * @Date: 2019-08-29 10:22:43
 * @information: 最后更新时间
 */

export default {
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
}
