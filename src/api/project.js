import request from '@/utils/request'

// 查找项目
export function findPro() {
  return request({
    url: '/project/index',
    method: 'get'
  })
}

// 新增or修改项目
export function editPro(data) {
  return request({
    url: '/project/save',
    method: 'post',
    data
  })
}

// 删除项目
export function delPro(data) {
  return request({
    url: '/project/destroy',
    method: 'post',
    data
  })
}
