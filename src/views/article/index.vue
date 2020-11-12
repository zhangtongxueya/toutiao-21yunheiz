<template>
  <div class="article-container">
    <!-- 上边的卡片 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- el-radio 默认把 label 作为文本和选中之后的 value 值 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">以删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <!-- 选中项的 value 的值，传递给 v-model  -->
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="(item, id) in articleChannels" :key="id" :label="item.name" :value="id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker v-model="rangeDtate" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['12:00:00']" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button 按钮的 click 事件有个默认参数,当你没有指定参数的时候,他会默认传递一个没有的数据 -->
          <!-- 下方的方法既然接受了: 初始的页数,所以这里页应该传递 -->
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选出来的数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果:
      </div>
      <!-- 数据列表 -->
      <!--
        Table 表格组件--渲染页面
        1.把需要展示的数组列表绑定给 table 组件的 data属性
        2.设计表格列 el-table-column
          width: 设定表格列的宽度
          label: 设定列的标题
          prop: 设定要渲染的列表项数据字段,只能展示文本
        3.如果需要展示其他内容,例如:放个按钮,图片,那么就需要自定义模板
       -->
      <el-table :data="articles" style="width: 100%" class="list-lable" stripe size="mini" v-loading="loading">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]" alt="">
            <img v-else class="article-cover" src="./no-cover.gif" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义模板中使用 当前遍历项数据,那么就在template 上添加 slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- <el-tag type="warning" v-if="scope.row.status==0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status==1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status==2">审核通过</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status==3">审核失败</el-tag>
            <el-tag type="info" v-else-if="scope.row.status==4">以删除</el-tag> -->
            <!-- 优化后 -->
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义模板,那么就把自定义的内容放到 template 中 -->
          <template slot-scope="scope">
            <el-button size="mini" type="primary" circle icon="el-icon-edit"
              @click="$router.push('/publish?id='+scope.row.id.toString())">
            </el-button>
            <el-button size="mini" type="danger" circle icon="el-icon-delete" @click="onDeleteArticle(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 列表分页 -->
      <el-pagination class="page" layout="prev, pager, next" @current-change="onCurrentChange" :current-page.sync="page"
        :page-size="pageSize" :total="totalCount" :disabled="loading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getArticle,
  getArticleChannels,
  deleteArticle
} from '@/api/article'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 存储的文章数据列表
      articles: [],
      articleStatus: [{
        status: 0,
        text: '草稿',
        type: 'warning'
      },
      {
        status: 1,
        text: '待审核',
        type: ''
      },
      {
        status: 2,
        text: '审核通过',
        type: 'success'
      },
      {
        status: 3,
        text: '审核失败',
        type: 'danger'
      },
      {
        status: 4,
        text: '以删除',
        type: 'info'
      }
      ],
      totalCount: 0, // 总条数
      pageSize: 10, // 每页显示的条数
      status: null, // 根据状态查询文章,不传就是全部
      articleChannels: '', // 文章频道
      channelId: null, // 根据频道 id 查询的数据
      rangeDtate: null, // 时间 筛选的条件 (时间组件自带清空，清空就是null，代表全部)
      loading: true, // 加载中
      page: 1 // 文章的当前页
    }
  },
  created () {
    // 文章列表的请求
    // 初始的时候页数为: 1
    this.loadArticles(1)
    // 文章频道的请求
    this.loadChannels()
  },
  methods: {
    // 文章列表请求
    // 接收传递过来的页数
    loadArticles (page) {
      this.loading = true
      // 把需要的 params 数据传递过去
      getArticle({
        // 当前页
        page,
        // 每页显示的数据条数
        per_page: this.pageSize,
        // 根据状态查询文章
        status: this.status,
        // 查询频道的 id
        channel_id: this.channelId,
        // 开始日期
        begin_pubdate: this.rangeDtate ? this.rangeDtate[0] : null,
        // 截至日期
        end_pubdate: this.rangeDtate ? this.rangeDtate[1] : null
      }).then(res => {
        // console.log(res);
        this.totalCount = res.data.data.total_count
        this.articles = res.data.data.results
        this.loading = false
      })
    },
    onCurrentChange (page) {
      // console.log(page);
      // 把改变的页数传递过去
      this.loadArticles(page)
    },
    // 加载文章频道的请求
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res);
        this.articleChannels = res.data.data.channels
      })
    },
    // 删除文章
    onDeleteArticle (id) {
      // console.log(id)
      // console.log(id.toString());
      this.$confirm('确定删除吗?', '删除退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id.toString()).then(res => {
          // 删除成功，更新当前页的数据列表
          this.loadArticles(this.page)
          // console.log('成功');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>
<style scoped lang="less">
  .filter-card {
    margin-bottom: 30px;
  }

  .box-card {

    .list-lable {
      margin-bottom: 20px;

      .article-cover {
        width: 60px;
        background-size: cover;
      }
    }

  }

</style>
