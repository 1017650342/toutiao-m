import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net', // 基准路径
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // 请求发起会经过这里
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 这里务必返回一个 config 配置对象,否则请求就停在这里出不去了
    return config
  },
  function(error) {
    // 如果请求出错了(还没有发出去),就会进入这里
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
