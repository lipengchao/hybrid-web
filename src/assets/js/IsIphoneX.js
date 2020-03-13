/**
 * 判断当前设备是否是IPhoneX设备
 * @return boolean true表示当前设备为iphonex，false表示不为iphonex
 */
const isIPhoneX = () => {
  // 判断window是否存在
  if (typeof window !== 'undefined' && window) {
    // window.navigator.userAgent 如果他包含iphone表示当前设备在IOS设备中运行
    // iphoneX及以上的设备屏幕垂直像素数大于812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}
const isLH = () => {
  let result = false
  const rate = window.screen.height / window.screen.width
  const limit = window.screen.height === window.screen.availHeight ? 1.8 : 1.65 // 临界判断值
  if (rate > limit) {
    result = true
  }
  return result
}
// 计算结果，赋值给window对象下的一个属性
window.isIPhoneX = isIPhoneX()
window.isLH = isLH()
