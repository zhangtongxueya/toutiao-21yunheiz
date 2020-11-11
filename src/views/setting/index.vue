<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <!-- 个人信息 -->
        <el-col :span="16">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onUpdateUser" :loading="updateProfileLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 头像 -->
        <el-col :span="4" :offset="3">
          <label for="file">
            <!-- 头像 -->
            <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input id="file" type="file" hidden ref="file" @change="onFileChange">
          <!-- <p @click="$refs.file.click()">点击修改头像</p> 第二种方法 -->
        </el-col>
      </el-row>
    </el-card>
    <!-- 预览层 -->
    <el-dialog append-to-body title="修改头像" :visible.sync="dialogVisible" @opened="onDialogOpend"
      @closed="onDialogClosed">
      <div class="perview-image-warp">
        <img class="perview-image" :src="perviewsImage" ref="perview-image" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="updateLoading" @click="onUploadPhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUserProfile, // 用户信息的接口
    updateUserPhoto, // 修改用户头像
    updateUser // 修改用户基本信息
  } from '@/api/user'

  import 'cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'

  // 引入 事件总线
  import globaBus from '@/utils/globabus'

  export default {
    name: 'SettingIndex',
    data() {
      return {
        user: {
          email: '',
          id: null,
          intro: '',
          mobile: '',
          name: '',
          photo: ''
        },
        dialogVisible: false, // 控制上传图片后,裁剪层的显示或隐藏
        perviewsImage: '', // 上传的要预览的图片
        cropper: null, // 裁切器
        updateLoading: false, // 上传头像时的loading 状态
        updateProfileLoading: false, // 保存按钮的loading
      }
    },
    created() {
      // 获取用户信息
      this.loadUser()
    },
    methods: {
      // 获取用户信息
      loadUser() {
        getUserProfile().then(res => {
          // console.log(res);
          this.user = res.data.data
        })
      },
      // 点击 更新用户信息
      onUpdateUser() {
        this.updateProfileLoading = true;
        const {
          name,
          intro,
          email
        } = this.user;
        updateUser({
          name,
          intro,
          email
        }).then(res => {
          // console.log(res);
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.updateProfileLoading = false;
          // 发布--事件总线
          globaBus.$emit('update-user', this.user);
        })
      },

      onFileChange() {
        // 预览层的显示或隐藏
        this.dialogVisible = true
        // 处理要预览的图片
        const file = this.$refs.file
        // console.log(file.files[0]); file.files[0]---就是上传的图片
        const seeImage = window.URL.createObjectURL(file.files[0])
        this.perviewsImage = seeImage

        // 修改上传相同一张图片,只触发一次
        this.$refs.file.value = ''
        // console.log('hello');
      },
      onDialogOpend() {
        // 图片裁切器必须基于 img 进行初始化
        // 注意: img 必须是可见状态才能够完成初始化
        //       因为这里要在对话框里面进行初始化
        // 所以要在 弹出框完全弹出(弹出动画结束) 的状态去初始化---然后获取 DOM 节点
        const image = this.$refs['perview-image']
        // 第一次初始化完成以后,如果裁剪的图片发生了改变,裁切器默认不会更新
        // 如果需要裁剪 新的图片,需要更新裁切器
        //    方式一: 裁切器.replace 方法
        //    方式而: 销毁裁切器,重新初始化 destroy
        this.cropper = new Cropper(image, {
          viewMode: 1, // 裁切框的比例
          dragMode: 'none', // 画布不允许移动
          AspectRatio: 1 // 裁切框固定的比例

          // 移动裁切器的时候会触发 crop 方法,这里不需要
          // crop(event) {
          //   console.log(event.detail.x)
          //   console.log(event.detail.y)
          //   console.log(event.detail.width)
          //   console.log(event.detail.height)
          //   console.log(event.detail.rotate)
          //   console.log(event.detail.scaleX)
          //   console.log(event.detail.scaleY)
          // }
        })
      },
      onDialogClosed() {
        // 弹出层动画完全关闭时销毁裁切器
        this.cropper.destroy()
      },
      // 点击确定上传裁切好的用户头像
      onUploadPhoto() {
        this.updateLoading = true
        this.cropper.getCroppedCanvas().toBlob(blob => {
          // console.log(blob);
          const fd = new FormData()
          fd.append('photo', blob)
          // 请求更新用户头像的接口
          updateUserPhoto(fd).then(res => {
            // console.log(res);
            // 关闭弹出层
            this.dialogVisible = false
            // 更新个人信息中的头像
            this.user.photo = window.URL.createObjectURL(blob)

            this.updateLoading = false

            // 把服务端返回的图片进行展示有点慢
            // this.user.photo = res.data.data.photo;

            // 发布--事件总线
            globaBus.$emit('update-user', this.user);
          })
        })
      }
    }
  }

</script>
<style scoped lang="less">
  .perview-image-warp {
    .perview-image {
      display: block;
      max-width: 100%;
      height: 280px;
    }
  }

</style>
