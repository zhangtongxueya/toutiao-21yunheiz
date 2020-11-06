<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- 侧边栏导航 -->
      <app-aside class="aside-menu" :is-collapse='isCollapse' />
    </el-aside>
    <el-container>
      <!-- 顶部菜单栏 -->
      <el-header class="header">
        <!-- 顶部左侧 -->
        <div>
          <!-- 展开收起图标 -->
          <!-- class样式处理 {css类名：布尔值} true-作用类名；false-不作用类名 -->
          <i :class="{'el-icon-s-unfold': isCollapse, 'el-icon-s-fold': !isCollapse}"
            @click="isCollapse=!isCollapse"></i>
          <span>小张头条号内容发布系统</span>
        </div>
        <!-- 顶部右侧--用户 -->
        <el-dropdown>
          <!-- 头像和昵称 -->
          <div class="avatar-warp">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <!-- 下拉箭头 -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">设置</el-dropdown-item>
            <!-- 组件默认不识别原生事件,除非内部做了处理 -->
            <!-- 但是事件之后 + native 可以识别(详情见 vue 文档) -->
            <el-dropdown-item icon="el-icon-close" @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view>首页</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import {
  getUserProfile
} from '@/api/user'

export default {
  data () {
    return {
      user: {},
      isCollapse: false // 子组件中侧边菜单栏的展开和收起
    }
  },
  components: {
    AppAside
  },
  created () {
    // 组件初始完成，请求获取用户资料
    this.loadUserProfile()
  },
  methods: {
    // 除了登录接口，其他接口需要提供身份才能获取数据
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 header 选项设置请求头 (api/user) 中
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        console.log(this.u)
      })
    },
    // 用户退出功能实现
    onLogout () {
      this.$confirm('确定退出登录吗?', '提示退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        // 跳转login 页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}

</script>
<style scoped lang="less">
  .layout-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .aside {
      background-color: #d3dce6;

      .aside-menu {
        height: 100%;
      }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;

      .avatar-warp {
        display: flex;
        justify-content: center;
        align-items: center;

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }

    .main {
      background-color: #e9eef3;
    }
  }

</style>
