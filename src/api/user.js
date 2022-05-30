import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function signin() {
  return request({
    url: '/user/signin',
    method: 'post'
  })
}

export function pass(data) {
  return request({
    url: '/user/pass',
    method: 'post',
    data
  })
}

// 获取电话客服
export function customerUser() {
  return request({
    url: 'user/customer',
    method: 'get'
  })
}

