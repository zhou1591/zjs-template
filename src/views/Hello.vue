<!--
 * @Date: 2019-09-19 19:05:18
 * @information: 最后更新时间
 -->
<template>
    <layout :layoutConfig="layoutConfig"></layout>
</template>

<script>

export default {
  data() {
    return {
      layoutConfig: {
        head: true,
        aside: true,
        main: true,
        foot: true
      }
    };
  },
  methods: {}
};
</script>

<style lang='scss'>
</style>