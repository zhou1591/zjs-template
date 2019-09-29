/*
 * @Date: 2019-08-09 15:06:16
 * @information: 最新更改时间
 */
export const publicCalss = {
  data() {
    return {
      // 查询模型
      searchModel: {
        pageInfo: {
          page: 1, //页数
          size: 20 //条数
        },
        query: {}
      },
      methodModel: {}, //公共方法的参数
      timeNow: null, //当前时间
      drawerBool: false, //侧滑触底事件标记
      noQueryTable: true, //不请求表体
    };
  },
  methods: {
    /**
     * @author: 周靖松
     * @information: 获取当前年月日
     * @Date: 2019-04-02 11:24:43
     */
    getDateNow() {
      // 获取当前日期
      let date = new Date();
      // 获取当前月份
      let nowMonth = date.getMonth() + 1;
      // 获取当前是几号
      let strDate = date.getDate();
      // 对月份进行处理，1-9月在前面添加一个“0”
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = `0${nowMonth}`;
      }
      // 对月份进行处理，1-9号在前面添加一个“0”
      if (strDate >= 0 && strDate <= 9) {
        strDate = `0${strDate}`;
      }
      this.timeNow = `${date.getFullYear()}-${nowMonth}-${strDate}`
    },
    /**
     * @author: 周靖松
     * @information: 分页发生改变
     * @Date: 2019-05-05 11:19:57
     */
    paginationChange(data) {
      let {
        name,
        val
      } = data
      this.searchModel.pageInfo[name] = val
      name == 'size' && (this.searchModel.pageInfo.page = 1)
      this.resetPostTableBody('scrollToTop')
    },
    /**
     * @author: 周靖松
     * @information: 滚动条置顶
     * @Date: 2019-04-27 13:08:24
     */
    scrollToTop() {
      this.$refs.baseTable.$el.querySelector('.el-table__body-wrapper').scrollTo(0, 0)
    },
    /**
     * @author: 周靖松
     * @information: 表格刷新
     * @Date: 2019-05-03 16:32:52
     */
    resetPostTableBody(option, searchModel) {
      // 开启loading
      this.loading = true
      this.postTableBody(searchModel ? searchModel : this.searchModel).then(res => {
          // 关闭loading
          this.loading = false
          // 执行传进来的方法
          option && this[option]()
        })
        .catch(error => {
          // 关闭loading
          this.loading = false
        })
    },
    /**
     * @author: 周靖松
     * @information: 关闭并提示动作
     * @Date: 2019-07-20 17:02:49
     */
    closeClass(openMessage, mark) {
      // 取值
      let {
        loadingName,
        message,
        closeMarkName
      } = this.methodModel
      // 关闭的数组
      let markArr = mark ? mark : [closeMarkName, loadingName]
      // 关闭标记 
      markArr.forEach(element => {
        element && (this[element] = false)
      });
      // 提示消息
      let endMessage = openMessage ? openMessage : message
      endMessage && this.$commonUtil.setMessage('success', endMessage, true)
    },
    /**
     * @author: 周靖松
     * @information: 回调动作
     * @Date: 2019-07-22 11:10:34
     */
    callBackThen(res) {
      // 取值
      let {
        callBack,
        notReset
      } = this.methodModel
      // 回调函数
      callBack && this[callBack](res)
      // 关闭动作
      this.closeClass()
        // 刷新表格
        !notReset && this.resetPostTableBody()
    },
    /**
     * @author: 周靖松
     * @information: 公共请求方法
     * @Date: 2019-05-15 13:42:14
     */
    methodQuery(methodModel) {
      // 全局赋值
      this.methodModel = methodModel
      // 取值
      let {
        loadingName,
        methodName,
        methodVal
      } = methodModel
      // loading
      loadingName && (this[loadingName] = true)
      // 请求
      methodName && this[methodName](methodVal).then(res => {
          this.callBackThen(res)
        })
        .catch(() => {
          loadingName && (this[loadingName] = false)
        })
    },
    /**
     * @author: 周靖松
     * @information: 异步队列
     * @Date: 2019-07-22 10:48:35
     */
    async whileQuery(methodModel) {
      // 全局赋值
      this.methodModel = methodModel
      // 取值
      let {
        loadingName,
        methodName,
        methodVal,
        closeMarkName
      } = methodModel
      this[loadingName] = true
      // 存储数组
      let valArr = [...methodVal]
      let len = valArr.length
      // promise队列结果
      let promiseThen = []
      // 发送请求
      while (valArr.length) {
        try {
          let res = await this[methodName](valArr.pop())
          promiseThen.push(res)
        } catch (error) {
          valArr = []
          this[closeMarkName] = false
          this[loadingName] = false
          this.resetPostTableBody()
        }
      }
      await (promiseThen.length == len) && this.callBackThen()
      return promiseThen
    },
    /**
     * @author: 周靖松
     * @information: 下载excel
     * @Date: 2019-07-28 16:51:07
     */
    exportExcelClick(excelName) {
      // load
      this.excelLoading = true
      this.exportExcel(this.searchModel.query).then(res => {
          this.$commonUtil.downExcel(res, excelName)
          // load
          this.excelLoading = false
        })
        .catch(_ => this.excelLoading = false)
    },
  },
  /**
   * @author: 周靖松
   * @information: 请求表体
   * @Date: 2019-04-27 16:50:08
   */
  mounted() {
    this.getTableHead();
    this.noQueryTable&&this.resetPostTableBody();
  }
}
