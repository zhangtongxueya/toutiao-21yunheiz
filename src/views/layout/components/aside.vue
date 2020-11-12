<template>
  <el-menu :default-active="$route.path" class="menu" text-color="#fff" active-text-color="#ffd04b"
    :collapse="isCollapse" router>
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont iconimage"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconpublish1"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-setting"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: true  使用的是父子间传递过来的数据，这里的就没有意义了
    }
  },
  methods: {

  }
}

</script>
<style scoped lang="less">
  // 导航栏
  .menu {
    background-color: #002033;

    .iconfont {
      margin-right: 10px;
      padding-left: 5px;
    }
  }

</style>
