import request from '@/utils/request'

// 专属区域管理 - 列表数据
export function indexArea() {
  return request({
    url: '/area/index',
    method: 'get'
  })
}

// 专属区域管理 - 保存/创建专属区域
export function saveArea(data) {
  return request({
    url: '/area/save',
    method: 'post',
    data
  })
}
// 专属区域管理 - 获取城市
export function cityArea() {
  return request({
    url: '/area/city',
    method: 'get'
  })
}
