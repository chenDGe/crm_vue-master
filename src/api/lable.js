import request from '@/utils/request'

// 标签管理 - 列表数据无分页
export function indexLabel() {
  return request({
    url: '/label/index',
    method: 'get'
  })
}

// 标签管理 - 保存/创建标签
export function saveLabel(data) {
  return request({
    url: '/label/save',
    method: 'post',
    data
  })
}

// 标签管理 - 创建子标签
export function addLabel(data) {
  return request({
    url: '/label/add',
    method: 'post',
    data
  })
}

// 标签管理 - 删除子标签
export function deleteLabel(data) {
  return request({
    url: '/label/delete',
    method: 'post',
    data
  })
}
