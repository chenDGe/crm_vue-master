import request from '@/utils/request'

// 客户分类规则管理 - 客户分类规则列表
export function indexRule() {
  return request({
    url: '/customer/rule/index',
    method: 'get'
  })
}

// 客户分类规则管理 - 添加或编辑分类规则
export function saveRule(data) {
  return request({
    url: '/customer/rule/save',
    method: 'post',
    data
  })
}

// 客户分类规则管理 - 获取分类规则
export function detailRule(params) {
  return request({
    url: '/customer/rule/detail',
    method: 'get',
    params
  })
}
