import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from "@/store/mutation-types"

// 创建 axios 实例
// axios.defaults.withCredentials=true;
const service = axios.create({
  baseURL: 'http://59.230.230.40', // api base_url http://127.0.0.1:3001/api //172.20.8.28:3001 正式环境//http://59.230.230.40/
  timeout: 6000 // 请求超时时间     
})

const err = (error) => {
  if (error.response) {
    if (error.status === 403) {
      notification.error({ message: '拒绝访问', description: '无权限，拒绝访问' })
    }
    if (error.status === 401) {
      notification.error({ message: '未授权', description: '授权验证失败' })
      store.dispatch('Logout').then(() => {
        location.reload()
      })
    }
  }
  return Promise.reject(error)
};

// request 拦截器
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)

  if (token) {
    // console.log('本地有token')
    // console.log(token)
    config.headers.common['Authorization'] = 'Bearer ' + token;
    //console.log(config) // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response 拦截器
service.interceptors.response.use((response) => {
  // console.log(response.data)
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}