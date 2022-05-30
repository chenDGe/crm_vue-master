import request from '@/utils/request'

// 部门管理 - 获取部门树形结构
export function findDepartment() {
  return request({
    url: '/department/tree',
    method: 'get'
  })
}

// 部门管理 - 列表数据无分页
export function indexDepartment() {
  return request({
    url: '/department/index',
    method: 'get'
  })
}

// 部门管理 - 根据部门id获取部门成员
export function usersDepartment(params) {
  return request({
    url: '/department/users',
    method: 'get',
    params
  })
}

// 部门管理 - 保存/创建部门
export function saveDepartment(data) {
  return request({
    url: '/department/save',
    method: 'post',
    data
  })
}

