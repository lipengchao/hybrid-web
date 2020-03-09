// axios 配置
import Vue from 'vue'
import axios from 'axios'

// 设置axios请求baseUrl
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

/**
 * 设置拦截器，interceptors响应处理
 * 在这里为所有的请求添加上token
//  */
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = '6d7d19f0-6212-11ea-8274-3745ec932c6a'
  } else {
    config.params = {
      token: '6d7d19f0-6212-11ea-8274-3745ec932c6a'
    }
  }
  // 返回配置的config
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 设置拦截器 interceptors 响应处理
 * 所有使用axios的请求响应，都会优先回调到拦截器中
 */
axios.interceptors.response.use(response => {
  // 统一处理数据,使组件中的请求只获取到需要的业务数据,
  // 而不需要去关注返回的状态码等于业务无关的数据
  return response.data.data
}, error => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
