<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- <h3>文案</h3>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
// 共享全局样式变量处理 vue.config.js中配置
// https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
h3{
  color: $success-color;
}
</style>
