<!--
 * @Date: 2019-09-11 18:37:00
 * @information: 最后更新时间
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return{
      menuLink:[],//权限按钮列表
      btnName:[],//权限按钮列表
      isJurisdiction:false,//是否完成权限判断
    }
  },
  name: 'App',
}
</script>

<style>
html,body {
  height:100%;
}
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
</style>
