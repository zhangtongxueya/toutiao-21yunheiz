<template>
  <div class="imagesList-container">
    <div class="btn">
      <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 上传素材 -->
      <el-button size="mini" type="success" v-if="isShowAdd" @click="dialogUploadVisible = true">上传素材</el-button>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in images" :key="index" :xs="12" :sm="6" :md="6" :lg="4" class="image-item"
        @click.native="selected = index">
        <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
        <!-- 文章发布页选择素材的 √ -->
        <div class="selected" v-if="isShowSelected && selected === index"></div>
        <!-- 删除和收藏 -->
        <div class="image-active" v-if="isShowArticle">
          <!-- 收藏 -->
          <!-- <i :class="{
              'el-icon-star-on': item.is_collected,
              'el-icon-star-off': !item.is_collected
              }" @click="onCollected(item)">
            </i> -->
          <el-button type="warning" :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            :loading="item.loading" circle @click="onCollected(item)" size="mini">
          </el-button>

          <!-- 删除 -->
          <!-- <i class="el-icon-delete-solid"></i> -->
          <el-button circle type="danger" size="mini" icon="el-icon-delete" @click="onDelete(item)"
            :loading=item.loading>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="totalCount" :page-size="pageSize" :current-page="page"
      @current-change="onPageChange">
    </el-pagination>
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
  </div>
</template>

<script>
// 获取素材列表
import {
  getImages,
  collectImage,
  deleteImage
} from '@/api/images'

export default {
  name: 'ImageIndex',
  props: {
    // 上传素材按钮的显示
    isShowAdd: {
      type: Boolean,
      default: true
    },
    // 是否显示图片的收藏和删除
    isShowArticle: {
      type: Boolean,
      default: true
    },
    // 是否显示选中图片的样式
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 获取本地存储的数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部的素材
      images: [], // 图片的数据
      dialogUploadVisible: false, // 上传素材对话框,默认不显示
      uploadHeaders: { // 上传素材的请求头设置
        Authorization: `Bearer ${user.token}`
      },
      page: 1, // 当前页
      pageSize: 12, // 每页显示的条数
      totalCount: 0, // 总页数
      selected: null // ✔ 的选定状态
    }
  },
  created () {
    // 获取素材列表
    this.loadImages(1)
  },
  methods: {
    // 获取素材列表
    loadImages (page) {
      this.page = page
      getImages({
        collect: this.collect, // false 代表全部, true 代表收藏
        page, // 当前页
        per_page: this.pageSize // 每页的条数
      }).then(res => {
        // console.log(res)
        const results = res.data.data.results // 获取出来的素材
        results.forEach(item => {
          item.loading = false
        })
        this.images = results // 获取出来的素材赋值给
        this.totalCount = res.data.data.total_count // 获取出来的条数
      })
    },
    // 全部和收藏按钮发送改变时
    // onCollectChange() {
    // // console.log(this.collect)
    // this.loadImages(1) // 获取素材列表
    // },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新全部素材
      this.loadImages() // 获取素材列表
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 点击页码的时候触发 点击了第几页
    onPageChange (page) {
      // console.log(page);
      this.loadImages(page)
    },
    // 点击 收藏按钮
    onCollected (item) {
      // console.log(item);
      item.loading = true
      collectImage(item.id, !item.is_collected).then(res => {
        // console.log(res);
        item.is_collected = !item.is_collected
        item.loading = false
      })

      // if (item.is_collected) {
      // // 如果已收藏,则取消收藏
      // collectImage(item.id, false).then(res => {
      // item.is_collected = false
      // })
      // } else {
      // // 如果没有收藏,则添加收藏
      // collectImage(item.id, true).then(res => {
      // item.is_collected = true
      // })
      // }
    },
    // 删除素材
    onDelete (item) {
      item.loading = true
      deleteImage(item.id).then(res => {
        this.loadImages()
        item.loading = false
      })
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
  .image-item {
    margin-bottom: 30px;
    position: relative;

    // 文章发布页选择素材的 √
    .selected {
      background: url('./selected.png') no-repeat;
      background-size: cover;
      position: absolute;
      top: 20%;
      left: 15%;
      right: 0;
      bottom: 0;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // 图片的收藏和删除项
    .image-active {
      height: 35px;
      position: absolute;
      bottom: 4px;
      left: 15px;
      right: 15px;
      background-color: rgba(204, 204, 204, 0.4);
      font-size: 23px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

</style>
