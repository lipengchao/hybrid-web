import Vue from 'vue'

/**
 * 商品金额过滤器
 * @params value 传入的金额
 */
Vue.filter('priceValue', function (value) {
  // 如果金额文本不存在，返回空
  if (!value) {
    return ''
  }

  // 转化为float
  const result = parseFloat(value)

  // 如果文本为interger类型，表示当前文本没有小数
  if (Number.isInteger(result)) {
    return result
  }

  // 文本包含小数，result.toFixed(2)
  return result.toFixed(2)
})

Vue.filter('filterTime', function (value) {
  if (!value) {
    return ''
  }
  // value不是时间格式 时:分：秒
  if (value.indexOf(':') === -1) {
    return value
  }
  let result = ''
  // arr[0] 小时
  // arr[1] 分钟
  // arr[2] 秒数
  const arr = value.split(':')
  result = parseInt(arr[0]) < 10 ? '0' + arr[0] : arr[0]
  result = parseInt(arr[1]) < 10 ? result + ':0' + arr[1] : result + ':' + arr[1]
  result = parseInt(arr[2]) < 10 ? result + ':0' + arr[2] : result + ':' + arr[2]

  return result
})
