import Vue from 'vue'
import axios from 'axios'
import serializeObj from './serializeObj'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = serializeObj(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (Number(res.resultCode) !== 1) {
      Vue.prototype.$toast.fail(`操作失败: ${res.resultDesc}`)
      return Promise.reject(res.resultDesc)
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debu
    return Promise.reject(error)
  }
)

export default service
