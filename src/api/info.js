import request from '@/utils/request'

// 信息来源规则管理 - 列表数据
export function indexInfo() {
  return request({
    url: '/info/index',
    method: 'get'
  })
}

// 信息来源规则管理 - 用户列表数据
export function userInfo(params) {
  return request({
    url: '/info/user',
    method: 'get',
    params
  })
}

// 信息来源规则管理 - 移除
export function deleteInfo(params) {
  return request({
    url: '/info/delete',
    method: 'get',
    params
  })
}
