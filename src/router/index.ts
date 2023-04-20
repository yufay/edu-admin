import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layout from '../layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
        // meta: { requiresAuth: true }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert-space/index.vue')
        // meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: 'errorPage' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('to=>', to)
  // console.log('from=>', from)
  // next()
  // 1. 直接判断访问的不是登陆页后 校验登陆态查看是否放行
  // if(to.path !== 'login'){
  //   // 校验登陆信息

  // }
  // 2. 如果有过多页面不需要登陆态可以使用路由元信息
  //  新增属性 meta: { requiresAuth: true }
  // if (to?.meta?.requiresAuth && !store.state.user) {
  if (to.matched.some(record => record.meta.requiresAuth && !store.state.user)) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    console.log('from', from)
    console.log('to', to)
    next({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
