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