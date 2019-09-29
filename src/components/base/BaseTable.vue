<!--
 * @Date: 2019-07-17 11:17:54
 * @information: 最新更改时间
 -->

<template>
  <!-- 基础表格组件 -->
  <div id="baseTable">
    <el-table header-row-class-name="tableHeadClass"
              highlight-current-row  
              empty-text='暂无数据'
              slot="empty"
              ref="table"              
              border
              style="width:100%;"
              height="calc(100% - 0.1px)"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-four-leaf="four-leaf"
              element-loading-size="lg"
              element-loading-background="rgba(255, 255, 255, 0.4)"
              :class="!tableBody.length&&'notMessage'"
              :row-style="rowClass"
              :data="tableBody"     
              :status-code='tableCode'      
              @row-click="clickRow"
              @cell-dblclick="dblLookInfo"
              @selection-change="selectChange"
              @overload="$emit('overload')">
      <!-- 是否显示多选框 -->
      <el-table-column v-if="select" type="selection" width="45"></el-table-column>
      <!-- 是否显示序号 -->
      <el-table-column v-if="serial" label="序号" type="index" :index="indexMethod" width="50"></el-table-column>
      <!-- 循环遍历表体数据 -->
      <el-table-column  v-for="(item,index) in tableHead"
                        show-overflow-tooltip
                        :align="item.textAlign?'right':'left'"
                        :key="index"
                        :prop="item.property"
                        :label="item.columnName"
                        :min-width="item.width">
        <!-- 费用名称插入图标 -->
        <template slot-scope="scope">
          <div  :class="['icon-box',{ 
                  'icon-flex':item.iconShow
                }]"
                :style="((item.bindClick&&!(scope.row['image']==='-'))||item.billNumberShow)&&'color:#1fb19e;cursor:pointer;'"
                @click="item.bindClick&&!(scope.row['image']==='-')&&imgClickShow(scope.row.id) 
                item.billNumberShow&&billNumberShow(scope.row)">
                <span :class="item.iconShow?'table-span_hidden':''" >{{scope.row[item.property]?item.textAlign?scope.row[item.property].toFixed(2):scope.row[item.property]:'-'}}</span>
                <el-tag style="margin-left:10px;float:right;"
                        circle 
                        v-for="(item,index) in item.iconShow&&scope.row.iconInfoList"
                        :type="item.icon"
                        :key="index">{{item.name}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- 按钮插槽列 -->
      <el-table-column v-if="operation" :width="operaWidth" align="center" label="操作">
        <!-- 给按钮绑定该行属性 -->
        <template slot-scope="tableRow">
          <slot :tableRow="tableRow.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    //是否显示多选框
    select: {
      type: Boolean,
      default: false
    },
    //是否显示序号
    serial: {
      type: Boolean,
      default: false
    },
    //表头数据
    tableHead: {
      type: [Array, Object]
    },
    //表体数据
    tableBody: {
      type: [Array, Object]
    },
    //操作栏的宽
    operaWidth: {
      type: Number,
      default: 200
    },
    //流体高度
    maxHeight: {
      type: Number,
      default: 650
    },
    // 是否显示操作列
    operation: {
      type: Boolean,
      default: true
    },
    // 是否为计算页面
    isDebitCompute: {
      type: Boolean,
      default: true
    },
    // 表格loading
    loading: {
      type: Boolean,
      default: false
    },
    // 表格高亮状态
    tableRowBright: {
      type: Boolean,
      default: false
    },
    // 当前行索引条件
    pages: Number,
    // 当前行索引条件
    size: Number,
    // 表体状态码
    tableCode: {
       type:[String,Number],
       default: 1000
    }
  },
  data() {
    return {
      checkRow: [], //选中的行
      selectRow: [], //选中的行
      rowMark: null, //是是否被重复点击
      cellLeftMark:true,//单元格左侧杠杠的开关
      rowIndex:-1,//最后点击的行下标
    };
  },
  methods: {
    /**
     * @author: 周靖松
     * @information: 表格行被选中
     * @parma:data 被选中行的所有数据
     * @Date: 2019-04-06 18:03:22
     */
    selectChange(data) { 
      this.$emit("checkRowChang", data);
      this.selectRow = data.length?data.map(el=>{
        return this.tableBody.indexOf(el)
      }):''
    },
    /**
     * @author: 周靖松
     * @information: 返回样式
     * @Date: 2019-04-06 18:03:31
     */
    rowClass({ row, rowIndex }) {
      return (
        this.selectRow.includes(rowIndex) && { "background-color": "#fff7d3" }
      );
    },
    /**
     * @author: 周靖松
     * @information: 单机选中
     * @Date: 2019-04-06 18:03:49
     */
    clickRow(row, rowIndex) {
      this.rowIndex=rowIndex
      let clickName= this.select?'clickToggleRow':'clickOneRow'
      this[clickName](row,rowIndex)
      this.$emit('clickRow',row)
    },
    /**
     * @author: 周靖松
     * @information: 单机多选高亮
     * @Date: 2019-07-28 15:44:43
     */
    clickToggleRow(row){
      // 多选高亮
      this.$refs.table.toggleRowSelection(row);
      this.$refs.table.setCurrentRow();
    },
    /**
     * @author: 周靖松
     * @information: 单选高亮
     * @Date: 2019-07-28 15:44:43
     */
    clickOneRow(row,rowIndex){
      this.$refs.table.setCurrentRow(row);
    },
    /**
     * @author: 周靖松
     * @information: 有图片的列点击列展开轮播图
     * @parma:val 选中行id
     * @Date: 2019-05-05 15:17:14
     */  
    imgClickShow(val){
      this.$emit('imgClickShow',val)
    },
    /**
     * @author: 周靖松
     * @information: 打开详情侧滑
     * @parma:val 选中行id
     * @Date: 2019-05-05 15:17:14
     */  
    billNumberShow(val){
      this.$emit('billNumberShow',val)
    },
    /**
     * @author: 周靖松
     * @information: 当前行索引
     * @Date: 2019-05-09 14:53:44
     */
    indexMethod (index) {
      return index + (this.pages - 1) * this.size + 1
    },
    /**
     * @author: 周靖松
     * @information: 双击进入详情
     * @Date: 2019-05-09 15:49:49
     */
    dblLookInfo (row, rowIndex) {
      this.$emit('dblLookInfo', row)
    },
    /**
     * @author: 周靖松
     * @information: 控制行高亮
     * @Date: 2019-05-10 16:38:03
     */  
    updateRowSelection(row,mark){
      // 等待设计变需求 暂时注销
      // row&&this.$refs.table.toggleRowSelection(row,mark);
      let markRow = mark?row:undefined
      row&&this.$refs.table.toggleRowSelection(row,false);
      row&&this.$refs.table.setCurrentRow(markRow);
      this.cellLeftMark=mark
    },
    /**
     * @author: 周靖松
     * @information: 行样式回调
     * @Date: 2019-06-26 12:01:01
     */  
    tableRow({row, column, rowIndex, columnIndex}){
      return (  
        column==this.rowIndex &&this.cellLeftMark&&"tableRowClass"
      );
    },
  },
};
</script>
