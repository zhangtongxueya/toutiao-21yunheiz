// 请求模块
import axios from 'axios'
import router from '@/router'
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

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 所有响应码为 2xx 的响应都经过这里

    // response 是响应结果； 注意：一定要把 response 返回，否则发请求的位置拿不到数据
    return response
  },
  function (error) {
    // 任何超出 2xx 的响应码都会进入这里
    // console.log("cuowu");
    console.dir(error)
    if (error.response && error.response.status === 401) {
      // 跳转到登录页面
      router.push('/login')
      // 清除本地存储的用户登录状态
      window.localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export default request
