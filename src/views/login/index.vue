<template>
  <div class="login">
    <el-form :rules="rules" ref="ruleForm" class="form-login" :model="form" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button :loading="disable" class="btn-login" type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
export default Vue.extend({
  name: 'login',
  data () {
    return {
      disable: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
      // 1. 表单验证
      // (this.$refs.ruleForm as any).validate()
        await (this.$refs.ruleForm as Form).validate()
        this.disable = true

        // 1.qs 转换 head-type  x-ww-form-urlencoded
        const { data } = await login(this.form)

        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 记录登录状态，状态需要能够全局访问（存储在vuex容器中）
          this.$store.commit('setUser', data.content)
          this.$message.success('登陆成功')
          // this.$router.push({ name: 'home' })
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push('/')
        }
        this.disable = false
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .form-login{
    width: 300px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    margin: 100px auto;
  }
  .btn-login{
    width: 100%;
  }
</style>
