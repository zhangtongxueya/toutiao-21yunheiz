// 文章相关的请求模块
import request from '@/utils/request'

// 获取文章列表(文章数据)
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // params: {}  params 接收一个对象
    // 但是这里可以使用用户传递进来的
    params
  })
}

// 获取文章频道的数据
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除选中的文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 发布新的的文章
// draft：不传，默认为false
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      // 接收 query 参数
      draft // 是否存为草稿
    },
    data // 接收 body 参数
  })
}

// 获取指定文章
export const appointArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 编辑文章/修改文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      // 接收 query 参数
      draft // 是否存为草稿
    },
    data // 接收 body 参数
  })
}

// 修改文章评论状态
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      // 对象的属性名不受代码规范限制
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
