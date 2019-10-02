<!--
 * @Date: 2019-09-20 10:03:11
 * @information: 最后更新时间
 -->
<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <slot  v-if="$slots.head" name="head"></slot>
      <layout-head v-else />
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <slot v-if="$slots.aside" name="aside"></slot>
        <layout-aside v-else />
      </el-aside>
      <el-container>
        <!-- 内容部门 -->
        <el-main >
          <slot v-if="$slots.main" name="main"></slot>
          <layout-main v-else />
        </el-main>
        <!-- 底部 -->
        <el-footer >
          <slot v-if="$slots.foot" name="foot"></slot>
          <layout-foot v-else />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>