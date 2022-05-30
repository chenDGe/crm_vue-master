// 在月份、日期、小时等小于10前面补0
const padDate = function(value) {
  return value < 10 ? '0' + value : value
}
export function formatDateTime(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = padDate(date.getMonth() + 1)
  const day = padDate(date.getDate())
  const hours = padDate(date.getHours())
  const minutes = padDate(date.getMinutes())
  const seconds = padDate(date.getSeconds())
  const time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  return time
}

export function recordDateTime(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = padDate(date.getMonth() + 1)
  const day = padDate(date.getDate())
  const hours = padDate(date.getHours())
  const minutes = padDate(date.getMinutes())
  const seconds = padDate(date.getSeconds())
  const time = year + month + day + hours + minutes + seconds
  return time
}

export function TimeDifference(t1, t2) {
  t1 = insertStr(insertStr(insertStr(insertStr(insertStr(t1, 4, '-'), 7, '-'), 10, '  '), 14, ':'), 17, ':00')
  t2 = insertStr(insertStr(insertStr(insertStr(insertStr(t2, 4, '-'), 7, '-'), 10, '  '), 14, ':'), 17, ':00')
  t1 = Date.parse(t1)
  t2 = Date.parse(t2)
  const time = parseInt((t1 - t2) / 1000)
  return time
}
function insertStr(soure, start, newStr) {
  return soure.slice(0, start) + newStr + soure.slice(start)
}
