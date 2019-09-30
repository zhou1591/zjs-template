<!--
 * @Date: 2019-07-17 11:17:55
 * @information: 最新更改时间
 -->
<template>
  <div :class="amountShow?'amount-box':''" id="pagination">
    <el-pagination  background
                    prev-text="上一页"
                    next-text="下一页"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 40 , 60]"
                    :page-size="20"
                    layout=" sizes, prev, pager, next,total"
                    :total="count"></el-pagination>
  </div>
</template>
<script>
export default {
    props:{
        // 总共有多少
        count:{
            type:Number,
            default:0
        },
        // 总共有多少页
        currentPage:{
            type:Number,
            default:0
        },
        // 汇总金额
        summaryAmount:{
            type:Number,
            default:0
        },
        // 汇总金额
        amountShow:{
            type:Boolean,
            default:false
        },
        // 金额名称
        AmountItem:{
            type:String,
            default:'金额'
        },
    },
  methods:{
      /**
       * @author: 周靖松
       * @information: 当前条发生变化
       * @parma: val 当前条
       * @Date: 2019-04-01 18:50:16
       */
      sizeChange(val){
          this.$emit("sizeChange",{val,name:'size'})
      },
      /**
       * @author: 周靖松
       * @information: 当前页发生变化
       * @parma: val 当前页 
       * @Date: 2019-04-01 18:50:16
       */
      currentChange(val){
          this.$emit("currentChange",{val,name:'page'})
      }
  }
};
</script>
