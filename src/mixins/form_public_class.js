/*
 * @Date: 2019-08-23 16:13:26
 * @information: 最新更改时间
 */
export default {
  methods: {
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
      notEnumerable.forEach(el => {4
        Object.defineProperty(this[target], el, {
          enumerable: false
        })
      })
    },
  }
}
