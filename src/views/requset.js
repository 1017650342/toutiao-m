import axios from 'axios'

const requset = axios.create({
  // 接口基准路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default requset
