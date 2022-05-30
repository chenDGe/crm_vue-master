import request from '@/utils/request'

// 品牌列表
export function findBrand(params) {
  return request({
    url: '/brand/index',
    method: 'get',
    params
  })
}
// 获取品牌详情
export function detailBrand() {
  return request({
    url: '/brand/detail',
    method: 'post'
  })
}

// 获取所有品牌名字和id
export function allBrand(params) {
  return request({
    url: '/brand/all',
    method: 'get',
    params
  })
}

// 启用/禁用品牌
export function opsBrand(data) {
  return request({
    url: '/brand/ops',
    method: 'post',
    data
  })
}

// 保存/创建品牌
export function saveBrand(data) {
  return request({
    url: '/brand/save',
    method: 'post',
    data
  })
}
