import request from '@/utils/request'

// 数据列表
export function findVisitor() {
  return request({
    url: '/visitor/index',
    method: 'get'
  })
}

// 保存/创建来访公司
export function saveVisitor(data) {
  return request({
    url: '/visitor/save',
    method: 'post',
    data
  })
}
