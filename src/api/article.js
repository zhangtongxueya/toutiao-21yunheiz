// 文章相关的请求模块
import request from '@/utils/requert'

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
