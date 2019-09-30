/*
 * @Date: 2019-08-23 16:13:26
 * @information: 最新更改时间
 */
export const formPublicClass = {
  methods: {
    /**
     * @author: 周靖松
     * @information:  字段交换赋值动作
     * @Date: 2019-08-23 15:39:28
     */
    copySave(orgin, obj, target) {
      // 目标源默认是form
      let targetObj = target || 'form'
      // 赋值源是否在this
      let orginObj = typeof orgin == 'string' ? this[orgin] : orgin
      // 对应赋值
      Object.entries(obj).forEach(el => {
        this[targetObj][el[0]] = orginObj[el[1]]
      })
    },
    /**
     * @Author: 周靖松
     * @information: 赋值操作
     * @Date: 2019-09-09 16:45:11
     */
    drawerSaveInit(orgin, target, notEnumerable) {
      this.$nextTick(() => {
        this[target] = JSON.parse(JSON.stringify(orgin))
      })
      if (!notEnumerable) return;
      if (typeof notEnumerable !== 'array') return new Error('第三个参数是一个数组')
      // 不可枚举项
      notEnumerable.forEach(el => {
        Object.defineProperty(this[target], el, {
          enumerable: false
        })
      })
    },
    /**
     * @author: 周靖松
     * @information: 清空指定值
     * @Date: 2019-05-12 11:21:54
     */
    clearField() {
      if (![...arguments].length) return new Error('请传入参数');
      let field = 'this';
      [...arguments].forEach((el, index) => {
        field += `.${el}`
      })
      eval(`${field}=undefined`)
    }
  }
}
