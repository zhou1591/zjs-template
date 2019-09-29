/*
 * @Date: 2019-07-17 11:17:55
 * @information: 最新更改时间
 */
/**
 * @author: 周靖松
 * @information: 高级搜索视图逻辑
 * @Date: 2019-08-17 09:34:37
 */
export const searchView = {
  data(){ 
    return{
      visible:false,//下拉开关
      // 模糊搜索需要的字段名
      blurrySearch:{
        AssetArchive:'assetsName',//付款
        RequestFunds:'peopleName',//资产档案
        Receipt:'more',//收款
      },
      // 远程搜索路径
      searchPath:{
        AssetArchive:'asset_archive',//付款
        RequestFunds:'requset_funds',//资产档案
        Receipt:'receipt',//收款
      },
      //下拉搜索需要从object里边获取的字段名
      listSearch:{
        AssetArchive:'assetsName',//付款
        RequestFunds:'name',//资产档案
        Receipt:'name',//收款
      },
      // 下拉搜索需要发送的字段名
      PrecisionSearch:{
        AssetArchive:'assetsNumber',//付款
        RequestFunds:'peopleId',//资产档案
        Receipt:'peopleId',//收款
      },
      subSearchModel:{
        query:{}
      },//子查询模板
    }
  },
  computed:{
    // 根据路由返回的参数
    blurrySearchName(){
      return this.blurrySearch[this.$route.name]
    },
    // 根据路由返回的请求路径
    searchPathName(){
      return this.searchPath[this.$route.name]
    },
    // 高级搜索的时候需要的下拉里边的字段名称
    listSearchName(){
      return this.listSearch[this.$route.name]
    }
  },
  methods: {
    /**
     * @author: 周靖松
     * @information: 清除数据刷新页面
     * @Date: 2019-03-31 21:44:58
     */
    clearInput() {
      this.searchModel.query[this.blurrySearchName]=undefined
      this.subSearchModel.query[this.blurrySearchName]=undefined
      this.searchQuerySave()
      this.$store.commit(`${this.searchPathName}/ADCANCED_SEARCH_TABLE`, null)
    },
     /**
     * @author: 周靖松
     * @information: 高级搜索远程搜索
     * @Date: 2019-05-04 09:48:04
     */
    advancedSearch(val,queryName,searchName,searchQuery,errorBack){
      if(val){  
        this.searchModel.query[queryName]=val 
        this.subSearchModel.query[queryName]=val  
        this[searchName](searchQuery)
      }else{
        this.searchModel.query[queryName]=undefined
        this.$store.commit(`${errorBack}/ADCANCED_SEARCH_TABLE`, null)
      } 
    },
    /**
     * @author: 周靖松
     * @information: 物资档案高级搜索
     * @Date: 2019-05-04 09:48:04
     */
    assetSearch(val){
      this.subSearchModel.query.assetsName=val
      this.advancedSearch(val,this.blurrySearchName,'assetSearchTable',this.subSearchModel,'asset_archive')
    },
    /**
     * @author: 周靖松
     * @information: 财务支出高级搜索
     * @Date: 2019-05-04 09:48:04
     */
    fundsSearch(val){
      this.advancedSearch(val,this.blurrySearchName,'fundsSearchTable',{query:{more:val}},'requset_funds')
    },
    /**
     * @author: 周靖松
     * @information: 回车搜索收起下拉
     * @parma: val 输入框的值
     * @Date: 2019-04-02 20:09:14
     */
    downEnter(val){
      this.searchModel.query[this.blurrySearchName]=val
      // 刷新到第一页并请求
      this.firstRefresh() 
    },
    /**
     * @author: 周靖松
     * @information: 部门远程搜索
     * @parma: val 输入框的值
     * @Date: 2019-04-02 20:09:14
     */
    getBranchMent(val){
      this.getBranchMentRemote({keyWord:val})
    },
    /**
     * @author: 周靖松
     * @information: 高级搜索选中拉下选项
     * @Date: 2019-04-02 18:16:16
     */
    selectChange(context,val) {
      if (val) {
        this.searchModel.query[this.blurrySearchName] = val[this.listSearchName]
        this.searchQuerySave(val.basicId||val.assetsNumber)
      }
    },
    /**
     * @author: 周靖松
     * @information: 精准查询
     * @Date: 2019-06-14 11:38:07
     */
    searchQuerySave(val){
      let searchModel = JSON.parse(JSON.stringify(this.searchModel))
      searchModel.query[this.PrecisionSearch[this.$route.name]]=val
      searchModel.query[this.blurrySearch[this.$route.name]]=undefined
      // 请求表体
      this.firstRefresh(false,searchModel);
    },
    /**
     * @author: 周靖松
     * @information: 刷新到第一页并请求
     * @Date: 2019-04-19 13:37:12
     */  
    firstRefresh(option,searchModel){
      this.searchModel.pageInfo.page=1
      this.resetPostTableBody(option,searchModel)
    },
    /**
     * @author: 周靖松
     * @information: 关闭高级搜索下拉
     * @Date: 2019-04-19 14:50:09
     */
    closeAdvancedSearch(){
      // 关闭下拉
      this.visible = false;
    },
    /**
     * @author: 周靖松
     * @information: 高级搜索点击查询
     * @parma:val 表单数据
     * @Date: 2019-03-20 10:19:45
     */
    seniorSearch(val,mark) {
      !mark&&this.closeAdvancedSearch()
      // 赋值model
      this.searchModelSave(val)
      // 请求表体
      this.firstRefresh();
    },
    /**
     * @author: 周靖松
     * @information: 高级搜索是否有值
     * @parma: val 高级搜索是否有值
     * @Date: 2019-03-22 14:30:45
     */
    pointMark(val) {
      this.point = val;
    },
    /**
     * @author: 周靖松
     * @information: 高级搜索查询值赋值缓存
     * @Date: 2019-03-21 15:11:06
     */
    searchModelSave(val) {
      // 去除空数据   
      for (let key in val) {
        val[key]=="0"||val[key]?val[key]=val[key]:val[key]=undefined   
      }
      // 高级搜索input需要储存的字段
      let {peopleName,assetsName,more,isFinance}=this.searchModel.query
      this.searchModel.query = { ...val,peopleName,assetsName,more,isFinance};
    },
    /**
     * @author: 周靖松
     * @information: 清空高级搜索所有值
     * @Date: 2019-05-09 14:44:32
     */  
    resetIndexSearch(){
      this.searchModel.query[this.blurrySearchName] = undefined;
      this.$refs.advancedSearch.modelVal = undefined;
      this.$refs.searchPaymentForm.paymentItemArr = undefined;
      this.seniorSearch({},true)
    },
    /**
     * @author: 周靖松
     * @information: 高级搜索下拉按钮被点击
     * @Date: 2019-07-17 18:12:31
     */  
    toggleAdvanceSearch() {
      this.visible = true;
    },
  }
}
