<template>
  <el-container>
    <el-aside width="200px">
      <appAside />
    </el-aside>
    <el-container>
      <el-header>
        <appHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import appAside from './components/app-aside.vue'
import appHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'appSide',
  components: { appAside, appHeader }

})
</script>

<style lang="scss" scoped>
.el-container{
  min-height: 100vh;
  // min-width: 980px;
}
.el-aside{
  background: #ccc;
}
.el-hearder{
  background: #fff;
}
.el-main{
  background: #ddd;
}
</style>
