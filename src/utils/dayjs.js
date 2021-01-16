import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间（仅供模板使用）
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方法：{{表达式 | 过滤器名称}}
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
