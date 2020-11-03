import Vue from 'vue'
import VueRouter from 'vue-router'
// @ 代表的是当前项目的 src 目录
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'

Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 嵌套路由的父路由不需要写名字
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }
    ]
  }
  // {
  //   path: "/home",
  //   name: "home",
  //   component: Home
  // }
]

const router = new VueRouter({
  routes
})

export default router
