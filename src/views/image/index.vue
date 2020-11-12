<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>

      </div>
      <!-- 图片列表 -->
      <images-list></images-list>
    </el-card>
  </div>
</template>

<script>
import ImagesList from './comments/images-list'

export default {
  data () {
    return {

    }
  },
  components: {
    ImagesList
  }
}

</script>
<style scoped lang="less">

</style>
