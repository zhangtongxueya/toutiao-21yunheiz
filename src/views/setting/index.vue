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
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="3">
          <label for="file">
            <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input id="file" type="file" hidden ref="file" @change="onFileChange">
          <!-- <p @click="$refs.file.click()">点击修改头像</p> 第二种方法 -->
        </el-col>
      </el-row>
    </el-card>
    <!-- 预览层 -->
    <el-dialog append-to-body title="修改头像" :visible.sync="dialogVisible" @opened="onDialogOpend">
      <div class="perview-image-warp">
        <img class="perview-image" :src="perviewsImage" ref="perview-image" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // 用户信息的接口
  import {
    getUserProfile
  } from '@/api/user'

  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';

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
          photo: '',
        },
        dialogVisible: false, // 控制上传图片后,裁剪层的显示或隐藏
        perviewsImage: '', // 上传的要预览的图片
      }
    },
    created() {
      this.loadUser();
    },
    methods: {
      // 获取用户信息
      loadUser() {
        getUserProfile().then(res => {
          // console.log(res);
          this.user = res.data.data
        })
      },
      onFileChange() {
        // 预览层的显示或隐藏
        this.dialogVisible = true;
        // 处理要预览的图片
        const file = this.$refs.file;
        // console.log(file.files[0]); file.files[0]---就是上传的图片
        const seeImage = window.URL.createObjectURL(file.files[0]);
        this.perviewsImage = seeImage;

        // 修改上传相同一张图片,只触发一次
        this.$refs.file.value = '';
        // console.log('hello');
      },
      onDialogOpend() {
        const image = this.$refs['perview-image'];
        const cropper = new Cropper(image, {
          aspectRatio: 16 / 9,
          crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
          },
        });
      }
    },
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
