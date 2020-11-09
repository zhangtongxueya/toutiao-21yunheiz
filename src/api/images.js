// 素材请求的相关模块
import request from '@/utils/request'

// 上传图片素材的请求
// data是图片的地址
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般上传文件的接口都要求把 Content-Type 设置为 multipart/form-data,但是我们使用 axios 上传文件不需要手动设置,只要给 data 一个 FormData 对象即可
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 是否收藏素材
// 参数1: 指定项图片的id , 参数2: 收藏的状态
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
