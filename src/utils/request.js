// 请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建一个 axios 实例,通过这个实例来发请求,把需要的配置给这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 合适字符串）
  transformResponse: [
    function (data) {
      // axios 内部默认使用 JSON.parse 来转换处理的原始数据
      // return JSON.parse(data);

      // 后端返回的数据可能不是 JSON 数据的字符串
      // 那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

// 请求拦截器
// 项目是通过 request 发送请求，所以请求拦截器应该设置为 request
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关的配置信息对象，config 是可以修改的
  function (config) {
    // console.log(config);
    // 在拦截器中获取本地存储的数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有用户登录信息，则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 只有 return 之后，请求才会正在的发送
    return config
  },
  // 请求失败会进入这里
  function (error) {
    return Promise.reject(error)
  }
)

export default request
