// 引入 axios
import request from '@/utils/request'

/* 用户相关请求模块 */
// 用户登录函数
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 的请求体
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // (在 axios 请求拦截器中设置了)
  // const user = JSON.parse(window.localStorage.getItem("user"));
  // console.log(user);

  // 后端要求把需要授权的用户身份放到请求头中
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // axios 可以通过 header 选项设置请求头(在 axios 请求拦截器中设置了)
    // headers: {
    //   // 属性名和值都要看接口的要求
    //   // 属性名：Authorization
    //   // 属性值：Bearer 空格 token
    //   Authorization:
    //     // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU4MTk3ODEsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.q9v5wHbmd8kaK7Oso1eLHaBArjP1KwPFi72dm1cK9dY"
    //     `Bearer ${user.token}`
    // }
  })
}

// 修改用户基本信息
export const updateUser = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

// 修改用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
