// import { request } from '@/utils/request';
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

function toLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

async function refreshToken () {
  return await axios.create()({
    method: 'POST',
    url: 'front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
  // 更新缓存中数据
}
const request = axios.create({
// 配置选项

})
// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log('config', config)
  // 改写配置信息 实现统一拦截器
  config.headers.Authorization = store.state.user?.access_token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
let refreshFlag = false
let requestArr: any[] = []
request.interceptors.response.use(function (response) {
  // 所有2xxx状态码执行这里
  // 后端如果使用的自定义状态码 错误处理写在这里
  console.log('成功')
  return response
}, function (error) {
  // 超出2xxx状态码执行这里
  // 后端如果使用的HTTP状态码 错误处理写在这里
  if (error.response) {
    // 请求发送出去了，但是状态吗超出了2xx的范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 1. 如果不存在token 重定向到首页
      if (!store.state.user.access_token) {
        toLogin()
        return Promise.reject(error)
      }
      // 2. 尝试刷新获取新的 token
      if (!refreshFlag) {
        refreshFlag = true
        refreshToken().then((res) => {
          if (!res.data.success) {
            throw new Error('刷新失败')
          }
          store.commit('setUser', res.data.content)
          // 重新发起请求
          requestArr.forEach(cb => cb())
          // 重置
          requestArr = []
          return request(error.config)
        }).catch((error) => {
          store.commit('setUser', null)
          toLogin()
          return Promise.reject(error)
        }).finally(() => {
          refreshFlag = false
        })
      }
      // 刷新状态下，把请求挂起放在 request 数组中
      // requestArr.push(() => { request(error.config) })
      return new Promise(resolve => {
        requestArr.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，联系管理员')
    }
  } else if (error.request) {
    // 请求发出去没有收到相应
    Message.error('请求超时，请刷新重试')
  } else {
    // 在设置请求时发生了错误
    Message.error(`请求失败: ${error.message}`)
  }

  // 把请求失败的错误对象继续抛出，热给下一个调用者
  return Promise.reject(error)
})

export default request
