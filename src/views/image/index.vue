<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>

      </div>
      <div class="btn">
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 上传素材 -->
        <el-button size="mini" type="success">操作按钮</el-button>
      </div>
      <el-row :gutter="30">
        <el-col v-for="(item, id) in images" :key="id" :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 获取素材列表
import {
  getImages
} from '@/api/images'

export default {
  name: 'ImageIndex',
  data () {
    return {
      collect: false, // 默认查询全部的素材
      images: [] // 图片的数据
    }
  },
  created () {
    // 获取素材列表
    this.loadImages(false)
  },
  methods: {
    // 获取素材列表
    loadImages (collect = false) {
      getImages({
        collect // false 代表全部, true 代表收藏
      }).then(res => {
        // console.log(res);
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      console.log(value)
      this.loadImages(value)
    }
  }
}

</script>
<style scoped lang="less">
  // 按钮内部下边距
  .btn {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  // 每个图片的显示项
  .list {
    margin-bottom: 30px;
  }

</style>
