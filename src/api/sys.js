import request from '@/utils/request'

// 信息来源规则管理 - 列表数据
export function saveSys(data) {
  return request({
    url: '/config/save',
    method: 'post',
    data
  })
}

// 信息来源规则管理 - 列表数据
export function indexSys() {
  return request({
    url: '/config/index',
    method: 'get'
  })
}
