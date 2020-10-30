// 请求模块
import axios from 'axios'
// 创建一个 axios 实例,通过这个实例来发请求,把需要的配置给这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request
