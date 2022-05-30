import request from '@/utils/request'

// 员工管理 - 获取员工列表
export function indexStaff(params) {
  return request({
    url: '/user/index',
    method: 'get',
    params
  })
}

// 启用/禁用
export function opsStaff(data) {
  return request({
    url: '/user/ops',
    method: 'post',
    data
  })
}

// 保存/创建员工
export function saveStaff(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

//  获取员工签到日志
export function signLogsStaff(params) {
  return request({
    url: '/user/signin-logs',
    method: 'get',
    params
  })
}

//  获取员工登录日志
export function logStaff(params) {
  return request({
    url: '/user/log',
    method: 'get',
    params
  })
}

//  获取在线员工
export function onlineStaff() {
  return request({
    url: '/user/online',
    method: 'get'
  })
}

//  强制员工下线
export function offLineStaff(data) {
  return request({
    url: '/user/offline',
    method: 'post',
    data
  })
}
