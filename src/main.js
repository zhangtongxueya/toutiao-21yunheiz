// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载全局样式组件
import './styles/index.less'

Vue.config.productionTip = false

// 创建 Vue 根实例
// 把 router 配置到根实例
// 通过 render 方法把 app 根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
