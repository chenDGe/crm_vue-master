import request from '@/utils/request'

export function userResource() {
  return request({
    url: '/user/statistics',
    method: 'get'
  })
}

// 客户管理 - 保存/创建客户
export function saveResource(data) {
  return request({
    url: '/customer/save',
    method: 'post',
    data
  })
}

// 客户管理 - 地址三级连动
export function areaResource(params) {
  return request({
    url: '/customer/area',
    method: 'get',
    params
  })
}
// 客户管理 - 获取品牌
export function brandResource() {
  return request({
    url: '/customer/brand',
    method: 'get'
  })
}

// 客户管理 - 获取未签约客户列表
export function notSignedResource() {
  return request({
    url: '/customer/not-signed',
    method: 'get'
  })
}
// 客户管理 - 获取已签约客户列表
export function signedResource() {
  return request({
    url: '/customer/signed',
    method: 'get'
  })
}

// 客户管理 - 上传
export function importCustomer(data) {
  return request({
    url: '/customer/import',
    method: 'post',
    data
  })
}

// 导出
export function exportCustomer(params) {
  return request({
    url: '/customer/export',
    method: 'get',
    responseType: 'arraybuffer',
    params
  })
}

// 待联系客户
export function waitCustomer(params) {
  return request({
    url: '/customer/wait',
    method: 'get',
    params
  })
}

// 获取标签
export function labelCustomer() {
  return request({
    url: '/customer/label',
    method: 'get'
  })
}

// 获取标签
export function labelsCustomer() {
  return request({
    url: '/customer/labels',
    method: 'get'
  })
}

// 获取标签详情
export function detailLabelCustomer() {
  return request({
    url: '/customer/label-detail',
    method: 'get'
  })
}

// 保存标签
export function saveLabelCustomer(data) {
  return request({
    url: '/customer/label/save',
    method: 'post',
    data
  })
}

// 获取跟进人
export function departCustomer() {
  return request({
    url: '/customer/department',
    method: 'get'
  })
}

// 获取品牌
export function brandCustomer() {
  return request({
    url: '/customer/brand',
    method: 'get'
  })
}

// 获取区域
export function regionCustomer() {
  return request({
    url: '/customer/region',
    method: 'get'
  })
}

// 获取全部客户
export function allCustomer(params) {
  return request({
    url: '/customer/all',
    method: 'get',
    params
  })
}

// 获取客户分类规则
export function ruleCustomer() {
  return request({
    url: '/customer/rule',
    method: 'get'
  })
}
// 获取分类规则下的数据
export function cateCustomer(params) {
  return request({
    url: '/customer/level',
    method: 'get',
    params
  })
}

// 领取线索
export function receiveCustomer(data) {
  return request({
    url: '/customer/receive',
    method: 'post',
    data
  })
}

// 获取即将来访的客户
export function comingCustomer(params) {
  return request({
    url: '/customer/coming',
    method: 'get',
    params
  })
}

// 获取小组库
export function groupCustomer(params) {
  return request({
    url: '/customer/group',
    method: 'get',
    params
  })
}

// 获取客户详情
export function detailCustomer(params) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params
  })
}

// 保存来访计划
export function savePlanCustomer(data) {
  return request({
    url: '/customer/plan/save',
    method: 'post',
    data
  })
}

// 获取来访公司
export function visitorPlanCustomer(params) {
  return request({
    url: '/customer/plan/visitor',
    method: 'get',
    params
  })
}

// 获取客户跟进记录
export function remarkCustomer(data) {
  return request({
    url: '/customer/info/remark',
    method: 'post',
    data
  })
}

//  预约提醒
export function notifyCustomer(data) {
  return request({
    url: '/customer/info/notify',
    method: 'post',
    data
  })
}

// 取消来访计划
export function cancelPlanCustomer(params) {
  return request({
    url: '/customer/plan/cancel',
    method: 'get',
    params
  })
}

// 客户修改
export function updateCustomer(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}

// 放弃跟进客户
export function discardCustomer(data) {
  return request({
    url: '/customer/info/discard',
    method: 'post',
    data
  })
}

// 获取通话记录 /customer/message-logs
export function messageLosCustomer(params) {
  return request({
    url: '/customer/message-logs',
    method: 'get',
    params
  })
}

// 上传通话记录
export function uploadCustomer(data) {
  return request({
    url: '/customer/upload',
    method: 'post',
    data
  })
}

// 获取电话客服的统计记录.
export function statisticsCustomer(params) {
  return request({
    url: '/customer/statistics',
    method: 'get',
    params
  })
}

// customer/sign  签约
// /customer/fail    签约失败
export function signCustomer(data) {
  return request({
    url: 'customer/sign',
    method: 'post',
    data
  })
}

export function failCustomer(data) {
  return request({
    url: 'customer/fail',
    method: 'post',
    data
  })
}
