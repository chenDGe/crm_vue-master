import request from '@/utils/request'

// 资源状态管理 - 列表数据
export function indexStatus() {
  return request({
    url: '/resources/index',
    method: 'get'
  })
}

// 资源状态管理 - 保存/创建资源状态
export function saveStatus(data) {
  return request({
    url: '/resources/save',
    method: 'POST',
    data
  })
}

// 获取标签规则 /resources/label
export function labelStatus() {
  return request({
    url: '/resources/label',
    method: 'get'
  })
}
