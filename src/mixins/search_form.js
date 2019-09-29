/*
 * @Date: 2019-08-09 15:06:22
 * @information: 最新更改时间
 */
/**
 * @author: 周靖松
 * @information: 高级搜索表单逻辑
 * @Date: 2019-05-04 09:31:08
 */
export const searchForm = {
  computed: {
    pointMarkState: {
      get() {
        return Boolean(Object.values(this.form).find(el=>el))
      }
    }
  },
  data(){
    return {
      resetArr:{
        AssetArchive:['incomingUnitPriceDown','incomingUnitPriceUp','outBoundUnitPriceDown','outBoundUnitPriceUp'],//物资档案
        RequestFunds:['applicationDay','departmentId','paymentDay'],//支出管理
        Receipt:['receiptDate'],//付款管理
        WriteOff:['receiptDate'],//收款核销
        BankAccount:['paymentDay'],//银行账目管理
      }
    }
  },
  methods: {
    /**
     * @author: 周靖松
     * @information: 搜索部门名称
     * @Date: 2019-03-21 10:53:56
     */
    mentChange(val) {
      // 判断输入了值且不为空
      val&&val.replace(/\s+/g,"")? this.$emit("mentChange", val) : this.clearInput()
    },
    /**
     * @author: 周靖松
     * @information: 清空表单并刷新页面
     * @Date: 2019-03-21 11:13:12
     */
    resetForm(formName,mark) {
      // 清空级联
      this.costCode=undefined
      // 清空自定义字段
      this.resetArr[this.$route.name].forEach(el=>{
        this.form[el]=undefined
      })
      this.$refs[formName].resetFields();
      //监听红点
      this.$emit("pointMark", this.pointMarkState);
      //重置高级搜索返回值
      this.mentChange(undefined)
      //重置页面
      this.$emit("resetIndex");
      mark&&this.errorInput()
    },
    /**
     * @author: 周靖松
     * @information: 远程搜索下拉被选中
     * @Date: 2019-03-31 19:46:49
     */
    selectChange(val) {
      this.form.departmentId = val
    },
    /**
     * @author: 周靖松
     * @information: 清除远程搜索部门
     * @Date: 2019-04-16 15:26:01
     */
    clearInput() {
      this.$store.commit("requset_funds/BRANCH_MENT_REMOTE", null)
    },
  },
  /**
   * @author: 周靖松
   * @information: 监听数据更新
   * @Date: 2019-03-22 14:27:18
   */
  updated() {
    // 更新红点状态
    this.$emit("pointMark", this.pointMarkState);
  },
}
