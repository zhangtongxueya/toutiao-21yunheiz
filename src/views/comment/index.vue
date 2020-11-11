<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table stripeclass="comment-tabel" :data="articles">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论书">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论书">
        </el-table-column>
        <el-table-column prop="address" label="评论状态">
          <template slot-scope="scope">
            {{scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-switch :disabled="scope.row.statusDisabled" v-model="scope.row.comment_status" active-color="#13ce66"
              inactive-color="#ff4949" @change="onStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount" />
    </el-card>
  </div>
</template>

<script>
// 文章评论的请求(和文章内容是一个)
import {
  getArticle,
  updateCommentStatus
} from '@/api/article'

export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [], // 存储评论的数据
      totalCount: 0, // 评论的总条数
      pageSize: 10, // 每页的条数
      page: 1 // 当前页
    }
  },
  created () {
    // 页面初始化,请求文章评论
    this.loadArticle()
  },
  methods: {
    // 每页显示的条数改变后触发
    handleSizeChange () {
      this.loadArticle()
    },
    handleCurrentChange (page) {
      this.loadArticle(page)
    },
    // 获取文章评论
    loadArticle (page = 1) {
      this.page = page
      getArticle({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count // 总条数
      })
    },
    // 请求 是否允许评论的接口
    onStatusChange (article) {
      article.statusDisabled = true
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        // console.log(res);
        article.statusDisabled = false
        this.$message({
          message: article.comment_status ? '文章评论开启' : '文章评论关闭',
          type: 'success'
        })
      })
    }
  }
}

</script>
<style scoped lang="less">
  // 评论表格
  .comment-tabel {
    width: 100%;
    margin-bottom: 30px;
  }

</style>
