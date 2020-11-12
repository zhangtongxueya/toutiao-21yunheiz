<template>
  <div class="upload-cover" @click="onDialogOpen">
    <div class="cover-warp">
      <img class="cover-image" ref="cover-image" :src="value">
    </div>
    <el-dialog append-to-body title="文章封面" :visible.sync="dialogVisible" width="30%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <!--子组件-引入素材库 -->
          <images-list ref="image-list" :is-show-add="false" :is-show-article="false" :isShowSelected="true">
          </images-list>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref='file' @change="onFileChange">
          <img ref="preview-image" width="240" alt="">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 上传文件图片的接口
import {
  uploadImage
} from '@/api/images'

// 引入素材库
import ImagesList from '../../image/comments/images-list'

export default {
  name: 'UploadCover',
  props: ['value'],
  data () {
    return {
      dialogVisible: false, // 对话框的显示与隐藏
      activeName: 'first',
      perviewImg: '' // 对话框预览的图片
    }
  },
  components: {
    ImagesList
  },
  methods: {
    onDialogOpen () {
      this.dialogVisible = true
    },
    // 上传封面
    onFileChange () {
      // 用户上传的封面
      const file = this.$refs.file.files[0]
      // console.log(file);
      // 预览图片
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob

      // 防止用户上传同一种图片,不触发change 事件
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      // 如果 tab 时上传图片; 并且 input-file 有文件,才请求接口的方法
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          // 关闭对话框
          this.dialogVisible = false
          // console.log(res);
          this.$refs['cover-image'].src = res.data.data.url
          // 子组件给父组件传值 (将图片地址发送给父组件)
          this.$emit('input', res.data.data.url)
        })
      }
      if (this.activeName === 'first') {
        // 还有一种通信方式：父组件可以直接访问子组件中的数据---ref
        const imageList = this.$refs['image-list']
        // console.log(imageList.selected);  拿到了 索引
        const selected = imageList.selected
        console.log(imageList.selected)

        // 判断有没有选中图片
        if (selected === null) {
          this.$message({
            message: '请选择图片',
            type: 'warning'
          })
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 把选中图片的地址给父组件
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }

}

</script>
<style scoped lang="less">
  .cover-warp {
    width: 150px;
    height: 130px;
    border: 1px solid #ccc;

    .cover-image {
      height: 130px;
      width: 100%;
    }
  }

</style>
