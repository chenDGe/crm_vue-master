import request from '@/utils/request'

// 客户管理 - 客户分类获取列表
export function allCustomer(params) {
  return request({
    url: '/customer/all',
    method: 'get',
    params
  })
}

// 客户管理 - 客户分类获取列表
export function cateCustomer(params) {
  return request({
    url: '/customer/cate',
    method: 'get',
    params
  })
}
