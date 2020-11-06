import Vue from 'vue'
import VueRouter from 'vue-router'
// @ 代表的是当前项目的 src 目录
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Article from '@/views/article'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
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

// 导航守卫/路由拦截器：说白了所有页面的导航都会经过这里
// 守卫页面导航的
// to: 要去的 路由信息
// from: 来自哪里的 路由信息
// next: 放行
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，那么就要校验登录状态
  // 如果没有登录，则跳转登录页面
  // 如果登录了，则允许通过

  // 判断用户有没有登录
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (to.path !== '/login') {
    // to.path 代表的是要去的导航地址
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转登录页面
      next('/login')
    }
  } else {
    next()
  }
})

export default router
