<template>
  <div class="head">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click">
        <span class="el-dropdown-link">
            <el-avatar :size="50" :src="userInfo.portrait || require('@/assets/head.png')"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
            <el-dropdown-item @click.native = "logOutMegod">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
  name: 'appHead',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 模拟多次调用刷新token
    this.loadUserInfo()
    // this.loadUserInfo()
    // this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    logOutMegod () {
      console.log('退出登陆')
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'login' })
    }
  }
})
</script>

<style lang="scss" scoped>
.head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
.el-dropdown-link{
    display: flex;
    align-items: center;
}

</style>
