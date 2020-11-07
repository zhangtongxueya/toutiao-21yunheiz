<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option v-for="(item, id) in channels" :key="id" :label="item.name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 获取文章频道的数据
import {
  getArticleChannels,
  addArticle,
  appointArticle,
  updateArticle
} from '@/api/article'

export default {
  name: 'PublishIndex',
  data () {
    return {
      // 从后台获取到的文章频道的数据
      channels: [],
      // 发布文章-表单绑定的数据
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面的类型： -1-自动；0-无图； 1-1张； 3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      }
    }
  },
  created () {
    // 页面初始化，获取文章频道数据
    this.loadChannels()

    // 由于发布文章 和修改 页面 基本一直，所以公用了一个组件
    // 所以这里要判断: 如果路径参数中有 id,则根据id 展示对应的文章内容
    // 根据 id 点击编辑按钮跳转页面,$route.query 可以看到 id
    if (this.$route.query.id) {
      // 要编辑文章,所以就要加载获取这个文章
      this.loadArticle()
    }
  },
  methods: {
    // 获取文章频道数据
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res);
        this.channels = res.data.data.channels
      })
    },

    // 文章发表请求(和修改公用一个组件)
    // 判断是否 是修改文章,则执行修改操作;否则执行发布操作
    onPublish (draft = false) {
      if (this.$route.query.id) {
        updateArticle(this.$route.query.id, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    // 修改文章: 加载文章内容
    loadArticle () {
      // 获取指定文章
      appointArticle(this.$route.query.id).then(res => {
        // console.log(res);
        this.article = res.data.data
      })
    }
  }
}

</script>
<style scoped>
</style>
