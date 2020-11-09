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
        <el-button size="mini" type="success" @click="dialogUploadVisible = true">上传素材</el-button>
      </div>
      <el-row :gutter="30">
        <el-col v-for="(item, id) in images" :key="id" :xs="12" :sm="6" :md="6" :lg="4" class="list">
          <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
      <!-- 上传文件的对话框 -->
      <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
        <!--
           用 upload 组件： 本身就支持请求-提交上传操作，使用它不需要自己去发请求，他自己会发;
           1 默认是:POST  2.请求路径:action: 完成路径   3. 请求头:
         -->
        <el-upload class="upload-demo" drag action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders" :on-success="onUploadSuccess" name="image" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
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
    // 获取本地存储的数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部的素材
      images: [], // 图片的数据
      dialogUploadVisible: false, // 上传素材对话框,默认不显示
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
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
    // 全部和收藏按钮发送改变时
    onCollectChange (value) {
      console.log(value)
      this.loadImages(value)
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新全部素材
      this.loadImages(false)
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
