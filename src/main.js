// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入 element 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式组件
import './styles/index.less'

import { ElementTiptapPlugin } from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {
  lang: 'zh' // 语言设置
})
// 现在你已经在全局注册了 `el-tiptap` 组件  就可以在全局组件中使用了

Vue.use(ElementTiptapPlugin)

Vue.config.productionTip = false

// 创建 Vue 根实例
// 把 router 配置到根实例
// 通过 render 方法把 app 根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
