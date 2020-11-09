<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 上传素材 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="btn">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="30">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3755647799,1307160739&fm=26&gp=0.jpg"
            fit="cover"></el-image>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: '全部'
    }
  }
}

</script>
<style scoped lang="less">
  // 按钮内部下边距
  .btn {
    padding-bottom: 20px;
  }

  // 每个图片的显示项
  .list {
    margin-bottom: 30px;
  }

</style>
