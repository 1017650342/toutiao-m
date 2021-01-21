import request from '@/utils/request'

// 获取评论或评论回复
export const getComment = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
