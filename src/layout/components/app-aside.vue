<template>
<el-col>
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role"> <i class="el-icon-setting"></i>角色管理</el-menu-item>
        <el-menu-item index="/menu"> <i class="el-icon-setting"></i>资源管理</el-menu-item>
        <el-menu-item index="/resource"> <i class="el-icon-setting"></i>菜单管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert"> <i class="el-icon-setting"></i>广告列表</el-menu-item>
        <el-menu-item index="/advert-space"> <i class="el-icon-setting"></i>广告位列表</el-menu-item>
      </el-submenu>
    </el-menu>
</el-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LayOut',
  methods: {
    handleOpen (key: string, keyPath: string):void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string):void {
      console.log(key, keyPath)
    }
  }

})
</script>

<style lang="scss" scoped>
.el-menu{
    height: 100vh;
}
</style>
